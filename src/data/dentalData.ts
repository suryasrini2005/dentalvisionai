export type Category = 'material' | 'instrument' | 'tooth' | 'equipment';

export interface DentalObject {
  id: string;
  name: string;
  category: Category;
  imageUrl: string;
  description: string;
  composition: string;
  properties: {
    physical?: string;
    mechanical?: string;
    biological?: string;
  };
  uses: string;
  advantages: string[];
  limitations: string[];
  clinicalTips: string[];
  examNotes: {
    twoMark: string;
    fiveMark: string;
    tenMark: string;
  };
  mnemonics?: string;
  references: string[];
  level: 'UG' | 'PG';
}

export const dentalObjects: DentalObject[] = [
  {
    id: 'gic-1',
    name: 'Glass Ionomer Cement',
    category: 'material',
    imageUrl: '/placeholder.svg',
    description: 'A water-based cement composed of glass powder and polyacrylic acid that chemically bonds to tooth structure.',
    composition: 'Powder: Calcium fluoroaluminosilicate glass. Liquid: Polyacrylic acid, tartaric acid, water.',
    properties: {
      physical: 'Translucent appearance, fluoride release, coefficient of thermal expansion similar to tooth structure.',
      mechanical: 'Compressive strength: 150-200 MPa. Low tensile strength. Brittle in nature.',
      biological: 'Biocompatible, releases fluoride, minimal pulp irritation when used appropriately.',
    },
    uses: 'Class III and V restorations, liner/base, luting cement, ART restorations, pediatric dentistry.',
    advantages: [
      'Chemical adhesion to enamel and dentin',
      'Fluoride release and recharge capability',
      'Coefficient of thermal expansion similar to tooth',
      'Biocompatible with pulp',
      'Minimal shrinkage during setting',
    ],
    limitations: [
      'Low fracture toughness',
      'Moisture sensitive during initial setting',
      'Poor esthetics compared to composites',
      'Not suitable for stress-bearing areas',
    ],
    clinicalTips: [
      'Condition dentin with polyacrylic acid for 10 seconds',
      'Protect from moisture for first 24 hours',
      'Apply varnish or bonding agent as surface protection',
      'Do not desiccate the tooth surface before application',
    ],
    examNotes: {
      twoMark: 'GIC is an acid-base cement that bonds chemically to tooth structure and releases fluoride. Composed of fluoroaluminosilicate glass powder and polyacrylic acid liquid.',
      fiveMark: 'Glass Ionomer Cement (GIC) is a water-based restorative material. Composition: Powder contains calcium fluoroaluminosilicate glass, liquid contains polyacrylic acid and tartaric acid. Setting reaction is acid-base. Properties include fluoride release, chemical bonding to tooth, and biocompatibility. Uses: Class III, V restorations, liners, luting agents. Limitations: moisture sensitivity, low strength.',
      tenMark: 'Glass Ionomer Cement is an important restorative material introduced by Wilson and Kent in 1972. Composition: The powder is calcium fluoroaluminosilicate glass containing SiO2, Al2O3, CaF2, Na3AlF6, and AlPO4. The liquid contains polyacrylic acid (40-50%), tartaric acid (5-10%), and water. Setting reaction involves acid attack on glass particles releasing Ca2+, Al3+, F- ions which cross-link with carboxyl groups. Properties: Fluoride release occurs through surface wash-off and sustained diffusion. Chemical adhesion occurs via ionic bonding between carboxyl groups and calcium in tooth. Thermal expansion coefficient matches tooth structure. Classification: Type I (Luting), Type II (Restorative), Type III (Liner). Modifications include RMGIC, metal-reinforced GIC, and high-viscosity GIC. Clinical applications, advantages, and limitations should be discussed with recent developments.',
    },
    mnemonics: 'GIC FACTS: Glass powder, Ionomer bonding, Chemical adhesion, Fluoride release, Acid-base reaction, Conditioning needed, Tooth-colored, Sensitive to moisture',
    references: ['Phillips\' Science of Dental Materials, 13th Ed, Chapter 15'],
    level: 'UG',
  },
  {
    id: 'composite-1',
    name: 'Composite Resin',
    category: 'material',
    imageUrl: '/placeholder.svg',
    description: 'A tooth-colored restorative material consisting of resin matrix, filler particles, and coupling agent.',
    composition: 'Organic resin matrix (Bis-GMA, UDMA, TEGDMA), inorganic filler particles (silica, quartz), silane coupling agent, initiator-accelerator system.',
    properties: {
      physical: 'Excellent esthetics, various shades available, polishable to high luster.',
      mechanical: 'Compressive strength: 250-300 MPa, tensile strength: 30-90 MPa, elastic modulus varies with filler content.',
      biological: 'Generally biocompatible, some concerns about BPA release, requires bonding agent for adhesion.',
    },
    uses: 'Class I-V restorations, veneers, core buildups, pit and fissure sealants, bonded bridges.',
    advantages: [
      'Excellent esthetics and shade matching',
      'Conservative tooth preparation',
      'Bonds to tooth structure with adhesive',
      'Repairable',
      'No galvanic action',
    ],
    limitations: [
      'Polymerization shrinkage (2-5%)',
      'Technique sensitive',
      'Costly compared to amalgam',
      'Wear in stress-bearing areas',
      'Secondary caries at margins',
    ],
    clinicalTips: [
      'Use incremental technique (2mm layers)',
      'Ensure complete light curing',
      'Apply adhesive system properly',
      'Avoid contamination with moisture or blood',
    ],
    examNotes: {
      twoMark: 'Composite resin is a tooth-colored restorative material composed of organic resin matrix, inorganic filler particles, and silane coupling agent. It bonds to tooth via adhesive systems.',
      fiveMark: 'Composite resins are esthetic restorative materials. Composition: Resin matrix (Bis-GMA, UDMA), fillers (silica, quartz), coupling agent (silane), initiators. Classification by filler: macrofilled, microfilled, hybrid, nanofilled. Setting: light-activated or chemical cure. Polymerization shrinkage is main disadvantage. Require incremental placement technique.',
      tenMark: 'Composite resins revolutionized esthetic dentistry. Components include: 1) Resin matrix - Bis-GMA, UDMA, TEGDMA providing polymerizable organic phase. 2) Fillers - various sizes affecting properties: macrofilled (10-50μm), microfilled (0.04μm), hybrid, nanofilled. 3) Coupling agent - organosilane bonds filler to matrix. 4) Initiator system - camphorquinone for light cure, benzoyl peroxide for chemical cure. Classification, properties, indications, placement technique, finishing/polishing, and recent developments including bulk-fill composites and self-adhesive composites should be discussed.',
    },
    mnemonics: 'COMPOSITE: Curing light needed, Organic matrix, Matching shades, Polymerization shrinkage, Esthetic choice, Silane coupling, Incremental technique, Technique sensitive, Enamel bonding',
    references: ['Phillips\' Science of Dental Materials, 13th Ed, Chapter 13'],
    level: 'UG',
  },
  {
    id: 'explorer-1',
    name: 'Dental Explorer',
    category: 'instrument',
    imageUrl: '/placeholder.svg',
    description: 'A diagnostic instrument with a sharp, pointed working end used to detect caries, calculus, and defects in tooth structure.',
    composition: 'Made of stainless steel. Parts: Handle, shank, and working end (tip).',
    properties: {
      mechanical: 'Flexible tip for tactile sensitivity, durable stainless steel construction.',
    },
    uses: 'Detection of caries, examination of restoration margins, locating calculus deposits, checking tooth surface irregularities.',
    advantages: [
      'Excellent tactile feedback',
      'Simple to use',
      'Durable and autoclavable',
      'Multiple designs for different access',
    ],
    limitations: [
      'Can create iatrogenic defects if used aggressively',
      'May cause discomfort to patient',
      'Not suitable for detecting incipient caries',
      'Can damage newly placed restorations',
    ],
    clinicalTips: [
      'Use light touch for examination',
      'Avoid aggressive probing on incipient lesions',
      'Keep tip sharp for accurate detection',
      'Use systematic approach during examination',
    ],
    examNotes: {
      twoMark: 'Dental explorer is a diagnostic instrument with sharp, pointed tip used for detecting caries, calculus, and marginal defects. Types include straight explorer, cowhorn explorer, and pigtail explorer.',
      fiveMark: 'The dental explorer is an essential diagnostic instrument. Parts: Handle, shank, working end. Types: #23 shepherd\'s hook (general use), cowhorn (interproximal), pigtail (root surfaces). Uses: caries detection, margin examination, calculus detection. Should be used with light pressure to avoid iatrogenic damage.',
      tenMark: 'Detailed description of explorer types, design features, proper technique, and role in comprehensive oral examination along with other diagnostic instruments.',
    },
    references: ['Fundamentals of Operative Dentistry, 4th Ed, Chapter 3'],
    level: 'UG',
  },
  {
    id: 'maxillary-central-1',
    name: 'Maxillary Central Incisor',
    category: 'tooth',
    imageUrl: '/placeholder.svg',
    description: 'The largest and most prominent anterior tooth in the maxillary arch, positioned mesial to the lateral incisor.',
    composition: 'Crown: Enamel covering dentin with central pulp chamber. Root: Single, conical root with root canal.',
    properties: {
      physical: 'Crown length: 10-11mm, Root length: 12-13mm, Mesiodistal width: 8-9mm, Labiolingual width: 7mm.',
    },
    uses: 'Incising food, esthetics, phonetics, lip support.',
    advantages: [
      'Key tooth for smile esthetics',
      'Important for proper phonetics',
      'Relatively simple root anatomy',
      'Good crown-root ratio',
    ],
    limitations: [
      'Prone to trauma',
      'Visible dental work',
      'Complex treatment for optimal esthetics',
    ],
    clinicalTips: [
      'Consider incisal edge position for esthetics',
      'Maintain proper incisal guidance',
      'Assess for developmental anomalies',
      'Evaluate pulp vitality after trauma',
    ],
    examNotes: {
      twoMark: 'Maxillary central incisor is the largest anterior tooth. Crown: 10-11mm, Root: 12-13mm. Single-rooted with pulp chamber. Eruption: 7-8 years. Important for esthetics and phonetics.',
      fiveMark: 'The maxillary central incisor is tooth #8 and #9 in universal numbering. Morphology: Shovel-shaped crown, single root, flat labial surface with developmental grooves. Dimensions given. Pulp anatomy: Single root canal (rarely 2). Eruption at 7-8 years after primary incisor exfoliation. Clinical significance in esthetics, trauma, and restorative planning.',
      tenMark: 'Complete morphological description including crown anatomy (labial, lingual, mesial, distal, incisal aspects), root characteristics, pulp chamber anatomy, developmental features, variations, and clinical significance in various dental specialties.',
    },
    mnemonics: 'CENTRAL: Crown is largest, Enamel thick at incisal, Neat triangular outline, Trauma prone, Root single and long, Aesthetically important, Labial surface convex',
    references: ['Wheeler\'s Dental Anatomy, 10th Ed, Chapter 12'],
    level: 'UG',
  },
  {
    id: 'handpiece-1',
    name: 'High-Speed Handpiece',
    category: 'equipment',
    imageUrl: '/placeholder.svg',
    description: 'An air-driven dental handpiece operating at 250,000-400,000 RPM, used for rapid tooth structure removal.',
    composition: 'Turbine (air rotor), head, body, water spray nozzle, fiber optic light, bur chuck mechanism.',
    properties: {
      mechanical: 'Speed: 250,000-400,000 RPM, torque: relatively low, air-driven turbine mechanism.',
    },
    uses: 'Cavity preparation, crown preparation, removal of old restorations, tooth sectioning during extraction.',
    advantages: [
      'High cutting efficiency',
      'Reduced chair time',
      'Less patient fatigue',
      'Good visibility with fiber optics',
      'Water cooling prevents overheating',
    ],
    limitations: [
      'Low torque - may stall under pressure',
      'Risk of thermal injury if water spray fails',
      'Air emphysema risk',
      'Aerosol generation',
      'Regular maintenance required',
    ],
    clinicalTips: [
      'Always use adequate water spray',
      'Avoid applying excessive pressure',
      'Use feather-light touch for finishing',
      'Check bur seating before use',
      'Maintain regular lubrication schedule',
    ],
    examNotes: {
      twoMark: 'High-speed handpiece operates at 250,000-400,000 RPM using air turbine. Used for rapid cutting of tooth structure. Requires water cooling to prevent pulp damage.',
      fiveMark: 'High-speed handpieces are air-driven rotary instruments. Components: turbine, head, body, water spray, fiber optic. Speed range: 250,000-400,000 RPM. Low torque. Uses: cavity prep, crown prep. Advantages: efficiency, speed. Precautions: adequate water cooling, light pressure, proper maintenance. Types: friction grip, push-button chuck.',
      tenMark: 'Comprehensive discussion of high-speed handpiece including history, mechanism, components, speed and torque characteristics, cutting principles, water cooling requirements, sterilization protocols, maintenance, and comparison with low-speed handpiece.',
    },
    references: ['Fundamentals of Operative Dentistry, 4th Ed, Chapter 7'],
    level: 'UG',
  },
  {
    id: 'alginate-1',
    name: 'Alginate Impression Material',
    category: 'material',
    imageUrl: '/placeholder.svg',
    description: 'An irreversible hydrocolloid impression material derived from seaweed, used for diagnostic casts.',
    composition: 'Sodium/potassium alginate (12-15%), calcium sulfate reactor (8-12%), zinc oxide, diatomaceous earth fillers, sodium phosphate retarder.',
    properties: {
      physical: 'Elastic, hydrophilic, irreversible setting reaction, limited dimensional stability.',
      mechanical: 'Low tear strength, adequate elastic recovery, flexible set material.',
      biological: 'Non-toxic, biocompatible, pleasant handling.',
    },
    uses: 'Diagnostic casts, study models, provisional restorations, orthodontic models, custom tray fabrication.',
    advantages: [
      'Easy to mix and use',
      'Economical',
      'Comfortable for patients',
      'Good detail reproduction for diagnostic purposes',
      'Available in various setting times',
    ],
    limitations: [
      'Poor dimensional stability',
      'Cannot be electroplated',
      'Tears easily in undercuts',
      'Must pour immediately',
      'Not suitable for precise crown work',
    ],
    clinicalTips: [
      'Mix with cool water for extended working time',
      'Pour cast within 10-15 minutes',
      'Store in humid environment if delayed',
      'Use appropriate water/powder ratio',
    ],
    examNotes: {
      twoMark: 'Alginate is an irreversible hydrocolloid from seaweed. Setting: sol-gel transformation. Uses: study models, diagnostic casts. Limitations: poor dimensional stability, pour immediately.',
      fiveMark: 'Alginate impression material is derived from alginic acid from brown seaweed. Composition: sodium alginate, calcium sulfate, fillers, retarder. Setting by sol to gel conversion. Types: regular set (2-4.5 min) and fast set (1-2 min). Advantages: easy use, economical. Limitations: dimensional instability, syneresis, imbibition. Must pour within 15 minutes.',
      tenMark: 'Complete discussion of alginate including chemistry, composition, manipulation, setting reaction, types, properties, technique, dimensional changes, and clinical applications with comparison to other impression materials.',
    },
    mnemonics: 'ALGINATE: Alginic acid base, Limited stability, Gel from sol, Irreversible reaction, No electroplating, Affordable, Tears easily, Easy mixing',
    references: ['Phillips\' Science of Dental Materials, 13th Ed, Chapter 8'],
    level: 'UG',
  },
];

export const categories = [
  {
    id: 'material',
    name: 'Dental Materials',
    icon: '🧪',
    description: 'Cements, composites, impression materials, alloys',
    count: dentalObjects.filter(o => o.category === 'material').length,
  },
  {
    id: 'instrument',
    name: 'Instruments',
    icon: '🔧',
    description: 'Diagnostic, operative, surgical, endodontic',
    count: dentalObjects.filter(o => o.category === 'instrument').length,
  },
  {
    id: 'tooth',
    name: 'Teeth',
    icon: '🦷',
    description: 'Primary & permanent teeth morphology',
    count: dentalObjects.filter(o => o.category === 'tooth').length,
  },
  {
    id: 'equipment',
    name: 'Equipment',
    icon: '⚙️',
    description: 'Handpieces, curing lights, scalers',
    count: dentalObjects.filter(o => o.category === 'equipment').length,
  },
];

export const getCategoryColor = (category: Category): string => {
  const colors = {
    material: 'badge-material',
    instrument: 'badge-instrument',
    tooth: 'badge-tooth',
    equipment: 'badge-equipment',
  };
  return colors[category];
};

export const getCategoryLabel = (category: Category): string => {
  const labels = {
    material: 'Material',
    instrument: 'Instrument',
    tooth: 'Tooth',
    equipment: 'Equipment',
  };
  return labels[category];
};
