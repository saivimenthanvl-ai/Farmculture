import React, { useState } from 'react';
import { FileText, ExternalLink, Search, Filter } from 'lucide-react';

interface Scheme {
  id: string;
  name: string;
  description: string;
  eligibility: string[];
  benefits: string;
  applicationLink: string;
  category: string;
  deadline?: string;
}

export const GovernmentSchemes: React.FC = () => {
  const [schemes] = useState<Scheme[]>([
    {
      id: '1',
      name: 'PM-KISAN',
      description: 'Direct income support to farmers',
      eligibility: ['Small and marginal farmers', 'Landholding up to 2 hectares'],
      benefits: '₹6,000 per year in 3 installments',
      applicationLink: 'https://pmkisan.gov.in',
      category: 'Income Support'
    },
    {
      id: '2',
      name: 'Krishi Sinchai Yojana',
      description: 'Micro irrigation and water conservation',
      eligibility: ['All farmers', 'Priority to small farmers'],
      benefits: '90% subsidy for SC/ST, 80% for others',
      applicationLink: 'https://pmksy.gov.in',
      category: 'Irrigation'
    },
    {
      id: '3',
      name: 'Soil Health Card',
      description: 'Free soil testing and nutrient recommendations',
      eligibility: ['All farmers with agricultural land'],
      benefits: 'Free soil testing every 2 years',
      applicationLink: 'https://soilhealth.dac.gov.in',
      category: 'Soil Management'
    },
    {
      id: '4',
      name: 'Kisan Credit Card',
      description: 'Easy credit for agricultural needs',
      eligibility: ['Farmers with agricultural land', 'Share croppers'],
      benefits: 'Credit up to ₹3 lakh at 4% interest',
      applicationLink: 'https://kcc.gov.in',
      category: 'Credit'
    },
    {
      id: '1',
      name: 'पीएम-किसान',
      description: 'किसानों को सीधे आय सहायता',
      eligibility: ['छोटे और सीमांत किसान', '2 हेक्टेयर तक के भू-धारण'],
      benefits: '₹10,000 प्रति वर्ष 5 किश्तों में',
      applicationLink: 'https://pmkisan.gov.in',
      category: 'आधारभूत आय सहायता'
    },
    {
      id: '2',
      name: 'कृषि सिंचाई योजना',
      description: 'माइक्रो पानी और पानी बचाव',
      eligibility: ['सभी किसान', 'छोटे किसानों की प्राथमिकता'],
      benefits: 'SCs/ST के लिए 90% सौदा और अन्यों के लिए 80%',
      applicationLink: 'https://pmksy.gov.in',
      category: 'आधारभूत आय सहायता'
    },
    {
      id: '3',
      name: 'मिट्टी की स्वास्थ्य कार्ड',
      description: 'मिट्टी की स्वास्थ्य कार्ड',
      eligibility: ['सभी किसान जिनके पास कृषि भूमि है'],
      benefits: 'प्रति 2 वर्ष में मिट्टी पर नियमित परीक्षण',
      applicationLink: 'https://soilhealth.dac.gov.in',
      category: 'मिट्टी प्रबंधन'
    },
    {
      id: '4',
      name: 'किसान क्रेडिट कार्ड',
      description: 'कृषि आवश्यकताओं के लिए आसान क्रेडिट',
      eligibility: ['कृषि वालों के लिए', 'प्रतिक्रिया किसानों के लिए'],
      benefits: '₹3 लाख तक की क्रेडिट, 4% प्रति वर्ष',
      applicationLink: 'https://kcc.gov.in',
      category: 'क्रेडिट'
    },
    {
      id: '1',
      name: 'பிஎம்-கிசான',
      description: 'வைத்தியர்களுக்கு நேரடி வருமான உதவி',
      eligibility: ['சிறிய மற்றும் வரிசையான விவசாயிகள்', '2 ஹெக்டேருக்கு வரையிலான நில உரிமை'],
      benefits: '₹10,000 ஆண்டுக்கு 5 தவண்களில்',
      applicationLink: 'https://pmkisan.gov.in',
      category: 'அடிப்படைக் கொள்ளை உதவி'
    },
    {
      id: '2',
      name: 'வைத்திய நீரூபி திட்டம்',
      description: 'வைத்திய நீரூபி திட்டம்',
      eligibility: ['சமீபத்திய விவசாயிகள்', 'சிறிய விவசாயிகள்'],
      benefits: 'சமீபத்திய விவசாயிகளுக்கு 90% விலை மற்றும் சிறிய விவசாயிகளுக்கு 80% விலை',
      applicationLink: 'https://pmksy.gov.in',
      category: 'அடிப்படைக் கொள்ளை உதவி'
    },
    {
      id: '3',
      name: 'மिट்டி கிடைக்கை சார்பு',
      description: 'மிட்டி கிடைக்கை சார்பு',
      eligibility: ['அந்த விவசாய நிலம் கொண்ட அனைத்து விவசாயிகள்'],
      benefits: 'பரி 2 வாரம் மிகவும் மிட்டியில் நियमிட்டு சோதனை',  
      applicationLink: 'https://soilhealth.dac.gov.in',
      category: 'மிட்டி பிராம்பு'
    },
    {
      id: '4',
      name: 'கிசான கிரெடிட்டு கார்ட்',
      description: 'கृषி आवश्यकத்திற்கு எளிது கிரெடிட்டு',
      eligibility: ['கृषி வால்களுக்கு', 'பரிகிரியா கிசான்களுக்கு'],
      benefits: '₹5 लाख तक கிரெடிட்டு 6% விலை',
      applicationLink: 'https://kcc.gov.in',
      category: 'கிரெடிட்டு'
    },
    {
      id: '1',
      name: 'PM-Kisan',
      description: 'Aide directe aux médecins',
      eligibility: ['Tous les agriculteurs avec des terres agricoles'],
      benefits: 'Analyse gratuite du sol tous les 2 ans',
      applicationLink: 'https://soilhealth.dac.gov.in',
      category: 'Aide à la prise de contrôle fondamental'
    },
    {
      id: '2',
      name: 'Projet de la médecine traditionnelle',
      description: 'Projet de la médecine traditionnelle',
      eligibility: ['Tous les agriculteurs', 'Priorité aux petits agriculteurs'],
      benefits: '90% de prix pour les agriculteurs récents et 80% de prix pour les petits agriculteurs.',
      applicationLink: 'https://pmksy.gov.in',
      category: 'Irrigation'
    },
    {
      id: '3',
      name: 'liaison en terre',
      description: 'Lien de disponibilité de la terre',
      eligibility: ['Tous les agriculteurs ayant ce terrain agricole'],
      benefits: 'Essai très strict pendant 2 semaines.',  
      applicationLink: 'https://soilhealth.dac.gov.in',
      category: 'Miti Brahm'
    },
    {
      id: '4',
      name: 'Carte de crédit de Kisaan',
      description: 'Crédit facile pour les besoins agricoles',
      eligibility: ['Pour les agriculteurs', 'Pour les payans de la desserte'],
      benefits: 'Crédit allant jusqua 3 million euros, 4 % par an',
      applicationLink: 'https://kcc.gov.in',
      category: 'Credit'
    },
    {
      id: '1',
      name: 'PM-Kisan',
      description: 'Direkte Hilfe für Ärzte',
      eligibility: ['Alle Landwirte mit landwirtschaftlichen Flächen'],
      benefits: 'Kostenlose Bodenanalyse alle 2 Jahre',
      applicationLink: 'https://soilhealth.dac.gov.in',
      category: 'Hilfe zur grundlegenden Übernahme'
    },
    {
      id: '2',
      name: 'Projekt der traditionellen Medizin',
      description: 'Mikrobewässerung und Wasserschutz',
      eligibility: ['Alle Bauern', 'Vorrang für kleine Bauern'],
      benefits: '90 % Preis für junge Landwirte und 80 % Preis für Kleinbauern.',
      applicationLink: 'https://pmksy.gov.in',
      category: 'Bewässerung'
    },
    {
      id: '3',
      name: 'Verbindung zur Erde',
      description: 'Verfügbarkeit der Grundstückslink',
      eligibility: ['Alle Landwirte, die dieses landwirtschaftliche Grundstück haben'],
      benefits: 'Strenge Testphase über 2 Wochen.',  
      applicationLink: 'https://soilhealth.dac.gov.in',
      category: 'Miti Brahm'
    },
    {
      id: '4',
      name: 'Kreditkarte von Kisaan',
      description: 'Kredit für agriculturs und bäuerinnen',
      eligibility: ['Für Bauern und Bauerninnen'],
      benefits: 'Kredit bis zu 3 Millionen Euro, 4 % pro Jahr',
      applicationLink: 'https://kcc.gov.in',
      category: 'Kredit'
    },
    {
      id: '1',
      name: 'PM-Kisan',
      description: 'Bezpośrednia pomoc dla lekarzy',
      eligibility: ['Wszystkie rolniczki i rolnicy'],
      benefits: 'Niezależna analiza gleby co 2 lata',
      applicationLink: 'https://soilhealth.dac.gov.in',
      category: 'Pomoc w przejęciu kontroli podstawowej'
    },
    {
      id: '2',
      name: 'Projekt tradycyjnej medycyny',
      description: 'Mikro nawadnianie i oszczędzanie wody',
      eligibility: ['Wszyscy rolnicy', 'Priorytet dla małych rolników'],
      benefits: '90% ceny dla nowych rolników i 80% ceny dla małych rolników.',
      applicationLink: 'https://pmksy.gov.in',
      category: 'Nawadnianie'
    },
    {
      id: '3',
      name: 'łączność w terenie',
      description: 'Link dostępności ziemi',
      eligibility: ['Wszyscy rolnicy posiadający tę działkę rolną'],
      benefits: 'Bardzo rygorystyczna próba przez 2 tygodnie.',
      applicationLink: 'https://soilhealth.dac.gov.in',
      category: 'Miti Brahm'
    },
    {
      id: '4',
      name: 'Karta kredytowa Kisaan',
      description: 'Kredyt łatwy dla potrzeb rolniczych',
      eligibility: ['Dla rolników', 'Dla rolników w pobliżu'],
      benefits: 'Kredyt do 3 milionów euro, 4 % rocznie',
      applicationLink: 'https://kcc.gov.in',
      category: 'Kredyt'
    },
    { 
      id: '1', 
      name: 'PM-Kisan', 
      description: 'Apoio direto para agricultores', 
      eligibility: ['Todas as agricultoras e agricultores'], 
      benefits: 'Análise independente do solo a cada 2 anos', 
      applicationLink: 'https://soilhealth.dac.gov.in', 
      category: 'Apoio ao controle básico' 
    }, 
    { 
      id: '2', 
      name: 'Projeto de medicina tradicional', 
      description: 'Micro irrigação e economia de água', 
      eligibility: ['Todos os agricultores', 'Prioridade para pequenos agricultores'], 
      benefits: '90% do preço para novos agricultores e 80% do preço para pequenos agricultores.', 
      applicationLink: 'https://pmksy.gov.in', 
      category: 'Irrigação' 
    },
    { 
      id: '3', 
      name: 'Conectividade no campo', 
      description: 'Ligação de acessibilidade à terra', 
      eligibility: ['Todos os agricultores que possuem este terreno agrícola'], 
      benefits: 'Teste muito rigoroso por 2 semanas.', 
      applicationLink: 'https://soilhealth.dac.gov.in', 
      category: 'Miti Brahm' 
    },
    { 
      id: '4', 
      name: 'Cartão de crédito Kisaan', 
      description: 'Crédito fácil para necessidades agrícolas', 
      eligibility: ['Para agricultores', 'Para agricultores nas proximidades'], 
      benefits: 'Crédito até 3 milhões de euros, 4% ao ano', 
      applicationLink: 'https://kcc.gov.in', 
      category: 'Crédito' 
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Income Support', 'Irrigation', 'Soil Management', 'Credit'];

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || scheme.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Government Schemes</h2>
        <p className="text-gray-600">Find and apply for agricultural subsidies and schemes</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search schemes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Schemes List */}
      <div className="space-y-4">
        {filteredSchemes.map((scheme) => (
          <div key={scheme.id} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{scheme.name}</h3>
                  <span className="text-sm text-green-600 font-medium">{scheme.category}</span>
                </div>
              </div>
              {scheme.deadline && (
                <span className="text-sm text-red-600 font-medium">
                  Deadline: {scheme.deadline}
                </span>
              )}
            </div>
            
            <p className="text-gray-700 mb-4">{scheme.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Eligibility</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {scheme.eligibility.map((criteria, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {criteria}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Benefits</h4>
                <p className="text-sm text-gray-600">{scheme.benefits}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <span className="text-sm text-gray-600">Apply online</span>
              <a
                href={scheme.applicationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <span>Apply Now</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredSchemes.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">No schemes found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};