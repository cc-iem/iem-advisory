#!/usr/bin/env python3
"""Generalize an MPXJ JSON export locally. The client source is never copied to the repo.

Usage: python3 scripts/build_greenfield_template.py /path/to/mpxj-export.json
"""
import hashlib
import json
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
WORKSTREAMS = [
    ('Governance & PMO', 'governance', 'Program Director', ['SL-06']),
    ('Strategy & Business Planning', 'strategy', 'Strategy Lead', ['SL-02','FIN-01','FIN-07']),
    ('Finance', 'finance', 'CFO', ['FIN-04','FIN-05','FIN-06']),
    ('Regulatory & Licensing', 'regulatory', 'Regulatory Lead', ['REC-05','SL-07']),
    ('Building & Construction', 'facilities', 'Developer / Facilities Lead', ['SQPE-03','IT-02']),
    ('Equipment & Biomedical Engineering', 'facilities', 'Biomedical Engineering Lead', ['IT-02','SL-06']),
    ('IT & Digital', 'digital', 'CIO / IT Lead', ['IT-01','IT-02','IT-03','IT-04','IT-06']),
    ('Clinical Operations & Service Lines', 'clinical', 'CMO / Clinical Operations Lead', ['SL-02','SL-03','SL-04','SL-05','SL-06']),
    ('Medical Staff', 'workforce', 'Medical Staff / Recruitment Lead', ['REC-02','REC-03','REC-04','REC-05','REC-06']),
    ('Nursing', 'clinical', 'Chief Nursing Officer', ['SL-05','EDU-04','SQPE-04']),
    ('Clinical Support Services', 'clinical', 'Clinical Support Leads', ['SL-04','SL-05','IT-03']),
    ('Safety, Quality & Patient Experience', 'sqpe', 'Quality & Safety Lead', ['SQPE-03','SQPE-04','SQPE-05','SQPE-07']),
    ('Human Resources', 'workforce', 'HR Lead', ['REC-01','REC-02','REC-03','REC-06']),
    ('Education & Training', 'workforce', 'Education Lead', ['EDU-01','EDU-02','EDU-03','EDU-04','EDU-05','EDU-06']),
    ('Supply Chain', 'support', 'Procurement / Logistics Lead', []),
    ('Support Services & Facilities Operations', 'support', 'COO / Facilities Operations Lead', []),
    ('Marketing & Patient Access', 'strategy', 'Growth / Patient Access Lead', ['IT-07','FIN-01']),
    ('Activation & Operational Readiness', 'governance', 'Activation Lead', ['SL-06','IT-06','EDU-05','SQPE-03'])
]
WS_STARTS = [43,74,91,114,137,164,187,214,241,257,278,302,326,350,370,387,406,424]
GATE_NAMES = {3:'Construction start',6:'Program scope and governance approved',7:'Opening scope, staffing and budget approved',8:'Design freeze',9:'Operating models approved; activation launched',10:'Shell and core complete',11:'Opening workforce onboarded',12:'Building handover',13:'Operating licence application submitted',14:'Operating licence granted',15:'Go / No-Go decision',16:'First patient',17:'Stabilization complete'}
REWRITE = {
    47:'Opening date, opening beds and service scope confirmed in writing',
    48:'Responsibilities agreed: hospital teams execute; advisers advise and review',
    49:'Governance cadence agreed: PMO, steering committee, advisory reviews and gate decisions',
    51:'PMO staffing and resourcing plan approved',
    62:'Cross-workstream dependency workshops',
    66:'Integrated countdown plan through the first 90 days of operations',
    72:'Lessons learned captured and reusable template updated',
    76:'Opening service portfolio and level of service agreed',
    78:'Phased capacity plan: beds, operating rooms, ICU, clinics and imaging',
    85:'Referral network and partnerships defined',
    90:'Operating-year strategy review and next capacity-phase decision',
    96:'Business case and financial model refreshed for the approved opening scope',
    105:'Opening-year operating budget approved',
    116:'Licensing roadmap: permits, authorities, sequence and locally confirmed lead times',
    119:'Technical service list prepared for operating licence application',
    124:'Operating licence application compiled: legal, personnel, equipment and service scope',
    125:'Facility legal and technical documentation received from the developer',
    130:'Regulatory appraisal or inspection hosted',
    132:'Pharmacy registration and practice certification obtained, where applicable',
    134:'Warehouse and vaccination-service approvals obtained, where applicable',
    136:'Licence scope extended for subsequent service and bed phases',
    189:'IT scope confirmed: enterprise systems rollout or new HIS / EHR, laboratory, imaging and ERP',
    244:'International department heads recruited and onboarded, where required',
    246:'Advisory recruitment request agreed: specialties, search criteria, scope and deliverables',
    247:'Recruitment advisory response: agreed scope, effort, people and deliverable',
    265:'Initial nursing, technical and clinical pharmacy cohorts in post',
    305:'Quality and safety framework and locally appropriate accreditation pathway defined',
    353:'Clinical education placements: scope, eligibility, candidates and schedule agreed',
    354:'Leadership development programme: scope, cohort and schedule agreed',
    408:'Membership or partnership brand usage and approvals process agreed, where applicable',
    409:'Opening announcement and communications approved',
    426:'Activation strategy: opening capacity, services and phased ramp-up',
    440:'Advisory readiness observation during integrated simulation, if agreed',
    447:'Capacity gates: staged release of additional beds and services'
}
NOTES = {
    8:'Confirm layout, equipment, digital, clinical-support and infection-prevention requirements together before design freeze.',
    15:'Opening requires an accountable decision against agreed evidence. Unresolved mandatory criteria require a scope or date decision.',
    48:'Delivery roles are engagement-specific. Advisory services do not automatically include running the hospital PMO or executing client tasks.',
    51:'Confirm PMO capacity separately from advisory hours; the schedule is not resource-levelled.',
    77:'Complete demand assessment before committing staffing, equipment and opening budgets.',
    102:'Master data must be ready for integrated system testing.',
    116:'Local licensing sequences and review times require confirmation by the responsible authority and local specialists.',
    122:'Practitioner licensing and registration must be completed before affected clinicians practise.',
    147:'Fit-out durations, early access and building commissioning need developer confirmation.',
    171:'Long-lead equipment procurement requires vendor-confirmed manufacturing, delivery and installation assumptions.',
    290:'Formulary and stock decisions feed master data, procurement and systems testing.',
    353:'Education placements depend on eligibility, available places, travel and credential lead times.',
    437:'Retain two simulation cycles, issue resolution and retesting, followed by a live-systems dress rehearsal.'
}

def generalize(text):
    text = str(text or '')
    replacements = [(r'Vinmec Central Park hub','referral hospital'),(r'Vinmec Central Park','referral hospital'),(r'Vinmec Ha Long Xanh|Ha Long Xanh','other hospital projects'),(r'Vinmec Can Gio|Can Gio','the new hospital'),(r'Vinhomes Construction Management Board','developer'),(r'Vinhomes','developer'),(r'Vinmec','hospital owner'),(r'Cleveland Clinic|\bCC\b','advisory team'),(r'Architecture Institute','design team'),(r'\bMoH\s*/\s*DoH\b|\bDoH\b|\bMoH\b','local regulator'),(r'HIS\s*/\s*EMR','HIS / EHR'),(r'\bGPP\b','pharmacy practice'),(r'\bGSP\b','storage practice'),(r'\s*\(VFS\)',''),(r'\s*\([^)]*Schedule [A-Z][^)]*\)',''),(r'\s*\([^)]*Section [0-9][^)]*\)',''),(r'\s*\(9 specialties\)',''),(r'\b100 to 500 beds\b|\b100-bed\b|\b500 beds\b|\bbeyond 100 beds\b|\bopening 100 beds\b','planned capacity'),(r'\babout 100 beds\b','the planned opening capacity'),(r'\bDecember 2027\b|\bJanuary 2027\b','the opening programme'),(r'\b2028\b','opening-year'),(r'\(4 books\)',''),(r'Book 4','licence submission'),(r'four-book dossier','licence application')]
    for pattern, replacement in replacements:text=re.sub(pattern,replacement,text,flags=re.I)
    return re.sub(r'\s+',' ',text).strip()

def build(source):
    raw=json.loads(Path(source).read_text())
    rows=[t for t in raw['tasks'] if not t.get('summary') and (t.get('unique_id',0)>=43 or t.get('unique_id') in GATE_NAMES)]
    ids={t['unique_id'] for t in rows}
    streams=[{'id':f'WS-{i:02}','number':i,'name':w[0],'domain':w[1],'owner':w[2],'products':w[3], 'coverage':'Coordination only; specialist scope to be agreed' if i in [4,5,6,11,15,16] else 'Related offerings; engagement scope to be agreed'} for i,w in enumerate(WORKSTREAMS,1)]
    tasks=[]
    for t in rows:
        uid=t['unique_id'];num=max((i+1 for i,n in enumerate(WS_STARTS) if uid>=n),default=18)
        if uid<43:num=18
        ws=streams[num-1]
        name=REWRITE.get(uid,GATE_NAMES.get(uid,generalize(t['name'])))
        title=name.lower()
        modules=[]
        for module,pattern in [('surgery',r'perioperat|surgeon|operating room|sterili|sterile'),('icu',r'\bicu\b|intensive care'),('imaging',r'imaging|radiation|\bpacs\b|\bct\b|\bmri\b'),('laboratory',r'laboratory|\blis\b|reagent'),('pharmacy',r'pharmacy|pharmaceutical|formulary'),('emergency',r'emergency|ambulance')]:
            if re.search(pattern,title):modules.append(module)
        scaling='fixed'
        if not t.get('milestone') and uid>=43 and re.search(r'recruitment|onboarding|orientation|training|equipment.*(install|receiv)|fit-up|stocking|competency validation',title):scaling='workload'
        phase='planning'
        if 'Activation' in t.get('text2',''):phase='activation'
        if 'Stabilization' in t.get('text2',''):phase='stabilization'
        if num in [5,6] and re.search(r'construction|fit-out|commission|install|acceptance|handover|shell|delivery|snagging',title):phase='build'
        if uid==3:phase='build'
        if uid in [12,13,14,15,16]:phase='activation'
        if uid==17:phase='stabilization'
        deps=[{'id':f'GF-{p["predecessor_task_unique_id"]:03}','type':p.get('type','FS'),'lag':round(p.get('lag',0)/28800,2) if p['predecessor_task_unique_id']==16 else 0,'sourceLag':round(p.get('lag',0)/28800,2)} for p in t.get('predecessors',[]) if p['predecessor_task_unique_id'] in ids]
        tasks.append({'id':f'GF-{uid:03}','sourceId':uid,'name':name,'workstream':ws['id'],'domain':ws['domain'],'phase':phase,'owner':generalize(t.get('text3')) or ws['owner'],'deliverable':generalize(t.get('text5')) or name,'notes':NOTES.get(uid,''),'duration':round(t.get('duration',0)/28800,2),'milestone':bool(t.get('milestone')),'gate':uid in [6,7,8,9,12,15,16,17], 'dependencies':deps,'modules':modules if uid>=43 and len(modules)==1 else [],'internationalOnly':uid in [122,244,246,247,331], 'scale':scaling,'advisory':{'Advise':'Advise','Review':'Review','CC-delivered':'Defined deliverable','Owner-led':'Owner-led','Joint decision':'Joint decision'}.get(t.get('text4'),'Owner-led'),'products':ws['products'],'durationStatus':'Reference estimate; specialist confirmation required'})
    # The reference overlapped construction to recover a compressed opening date.
    # Default generalized sequencing uses explicit completion checks instead of date padding.
    by_id={t['sourceId']:t for t in tasks}
    for successor,predecessor in [(147,10),(12,10),(12,155),(12,156)]:
        by_id[successor]['dependencies'].append({'id':f'GF-{predecessor:03}','type':'FS','lag':0,'origin':'Generalization completion check'})
    for successor,predecessor in [(151,147),(152,151),(153,151),(154,151),(155,151)]:
        for dependency in by_id[successor]['dependencies']:
            if dependency['id']==f'GF-{predecessor:03}':
                dependency['sourceType']=dependency['type'];dependency['type']='FS';dependency['origin']='Generalization completion check'
    by_id[147]['notes']='Default sequencing waits for shell and core completion. Any proposed construction overlap must be reviewed with the developer.'
    by_id[12]['notes']='Handover follows shell/core, fit-out, commissioning, acceptance and documentation. Specialist review is required before permitting any overlap.'
    out={'version':'1.0.0','title':'Greenfield Hospital Opening Template','source':{'format':'MS Project, parsed using MPXJ','sourceRowCount':len(raw['tasks']),'sourceDependencyCount':sum(len(t.get('predecessors',[])) for t in raw['tasks']),'exportSha256':hashlib.sha256(Path(source).read_bytes()).hexdigest(),'scope':'Generalized operational workstreams and gates. Client contract and engagement records excluded.','reviewStatus':'Planning draft; durations, local requirements and resourcing require confirmation.'},'reference':{'openingBeds':100,'departments':7,'workingHoursPerDay':8},'workstreams':streams,'tasks':tasks,'assumptions':['Weekdays are working days; entered holiday dates are excluded.','Pre-opening date-padding lags were removed; task relationships and post-opening review offsets were retained.','Reference activity durations are provisional and are not validated universal benchmarks.','Workload activities scale with opening beds, selected services and parallel teams; fixed lead times do not.','Country-specific licence sequences require local specialist review.','The model does not resource-level teams or guarantee an opening date.']}
    text=json.dumps(out,ensure_ascii=False,indent=2)
    if re.search(r'Vinmec|Vinhomes|Can Gio|Ha Long',text,re.I) or re.search(r'\bSchedule [A-Z]\b|\b202[678]\b',text):raise ValueError('Client-specific content remains in generalized template')
    (ROOT/'data/greenfield-template.js').write_text('/* Generated locally; see docs/planner-method.md. */\n(function(root){ root.CC_GREENFIELD = '+text+'; })(typeof window !== "undefined" ? window : globalThis);\n')
    print(f'Generated {len(tasks)} activities across {len(streams)} workstreams; {sum(len(t["dependencies"]) for t in tasks)} retained dependency links.')

if __name__=='__main__':build(sys.argv[1])
