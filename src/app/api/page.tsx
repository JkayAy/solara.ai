'use client';

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { Search, Code, Key, Database, Terminal, ChevronDown, ChevronUp } from "lucide-react";

const endpoints = [
 {
  category: 'Authentication',
  icon: Key,
  methods: [
   {
    method: 'POST',
    path: '/api/auth/login',
    description: 'Authenticate a user and get an access token',
    parameters: [
     { name: 'email', type: 'string', required: true, description: 'User email address' },
     { name: 'password', type: 'string', required: true, description: 'User password' },
    ],
    response: {
     type: 'object',
     properties: {
      token: 'string',
      user: 'object',
     },
    },
   },
   {
    method: 'POST',
    path: '/api/auth/refresh',
    description: 'Refresh an expired access token',
    parameters: [
     { name: 'refreshToken', type: 'string', required: true, description: 'Refresh token' },
    ],
    response: {
     type: 'object',
     properties: {
      token: 'string',
     },
    },
   },
  ],
 },
 {
  category: 'Data',
  icon: Database,
  methods: [
   {
    method: 'GET',
    path: '/api/data',
    description: 'Retrieve data with optional filtering',
    parameters: [
     { name: 'limit', type: 'number', required: false, description: 'Number of items to return' },
     { name: 'offset', type: 'number', required: false, description: 'Number of items to skip' },
     { name: 'filter', type: 'object', required: false, description: 'Filter criteria' },
    ],
    response: {
     type: 'object',
     properties: {
      data: 'array',
      total: 'number',
      limit: 'number',
      offset: 'number',
     },
    },
   },
   {
    method: 'POST',
    path: '/api/data',
    description: 'Create new data entry',
    parameters: [
     { name: 'data', type: 'object', required: true, description: 'Data to create' },
    ],
    response: {
     type: 'object',
     properties: {
      id: 'string',
      created: 'boolean',
     },
    },
   },
  ],
 },
];

const codeExamples = [
 {
  language: 'JavaScript',
  icon: Code,
  code: `// Authentication
const response = await fetch('https://api.solara.com/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123',
  }),
});

const { token } = await response.json();

// Data Retrieval
const data = await fetch('https://api.solara.com/data?limit=10', {
  headers: {
    'Authorization': \`Bearer \${token}\`,
  },
}).then(res => res.json());`,
 },
 {
  language: 'Python',
  icon: Terminal,
  code: `import requests

# Authentication
response = requests.post(
    'https://api.solara.com/auth/login',
    json={
        'email': 'user@example.com',
        'password': 'password123'
    }
)
token = response.json()['token']

# Data Retrieval
data = requests.get(
    'https://api.solara.com/data',
    params={'limit': 10},
    headers={'Authorization': f'Bearer {token}'}
).json()`,
 },
];

export default function ApiPage() {
 const [searchQuery, setSearchQuery] = useState('');
 const [expandedEndpoint, setExpandedEndpoint] = useState<string | null>(null);

 const toggleEndpoint = (path: string) => {
  setExpandedEndpoint(expandedEndpoint === path ? null : path);
 };

 const filteredEndpoints = endpoints.map(category => ({
  ...category,
  methods: category.methods.filter(method =>
   method.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
   method.description.toLowerCase().includes(searchQuery.toLowerCase())
  ),
 })).filter(category => category.methods.length > 0);

 return (
  <div className="min-h-screen flex flex-col">
   <Header />
   <main className="flex-1">
    {/* Hero Section */}
    <section className="py-20 bg-gradient-to-b from-background to-muted/50">
     <div className="container">
      <div className="max-w-3xl mx-auto text-center">
       <h1 className="text-4xl md:text-6xl font-bold mb-6">
        API Documentation
       </h1>
       <p className="text-xl text-muted-foreground mb-8">
        Integrate Solara with your applications using our powerful API
       </p>
       <div className="relative max-w-xl mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <input
         type="text"
         placeholder="Search endpoints..."
         className="w-full pl-10 pr-4 py-3 rounded-lg border bg-background"
         value={searchQuery}
         onChange={(e) => setSearchQuery(e.target.value)}
        />
       </div>
      </div>
     </div>
    </section>

    {/* API Endpoints */}
    <section className="py-20 bg-background">
     <div className="container">
      <div className="max-w-4xl mx-auto">
       {filteredEndpoints.map((category) => (
        <div key={category.category} className="mb-12">
         <div className="flex items-center gap-2 mb-6">
          <category.icon className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">{category.category}</h2>
         </div>
         <div className="space-y-4">
          {category.methods.map((method) => (
           <motion.div
            key={method.path}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border rounded-lg overflow-hidden"
           >
            <button
             onClick={() => toggleEndpoint(method.path)}
             className="w-full p-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
             <div className="flex items-center gap-4">
              <span className={`px-2 py-1 rounded text-sm ${method.method === 'GET' ? 'bg-blue-100 text-blue-800' :
                method.method === 'POST' ? 'bg-green-100 text-green-800' :
                 'bg-gray-100 text-gray-800'
               }`}>
               {method.method}
              </span>
              <span className="font-mono">{method.path}</span>
             </div>
             {expandedEndpoint === method.path ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground" />
             ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
             )}
            </button>
            {expandedEndpoint === method.path && (
             <div className="p-4 bg-muted/50 border-t space-y-4">
              <p className="text-muted-foreground">{method.description}</p>

              <div>
               <h4 className="font-semibold mb-2">Parameters</h4>
               <div className="space-y-2">
                {method.parameters.map((param) => (
                 <div key={param.name} className="flex items-start gap-2">
                  <span className="font-mono text-sm">{param.name}</span>
                  <span className="text-sm text-muted-foreground">
                   ({param.type}) {param.required ? 'required' : 'optional'} - {param.description}
                  </span>
                 </div>
                ))}
               </div>
              </div>

              <div>
               <h4 className="font-semibold mb-2">Response</h4>
               <pre className="bg-background p-4 rounded-lg overflow-x-auto">
                {JSON.stringify(method.response, null, 2)}
               </pre>
              </div>
             </div>
            )}
           </motion.div>
          ))}
         </div>
        </div>
       ))}
      </div>
     </div>
    </section>

    {/* Code Examples */}
    <section className="py-20 bg-muted/50">
     <div className="container">
      <div className="max-w-4xl mx-auto">
       <h2 className="text-3xl font-bold mb-8 text-center">Code Examples</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {codeExamples.map((example) => (
         <motion.div
          key={example.language}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border rounded-lg overflow-hidden bg-background"
         >
          <div className="p-4 border-b flex items-center gap-2">
           <example.icon className="w-5 h-5 text-primary" />
           <h3 className="font-semibold">{example.language}</h3>
          </div>
          <pre className="p-4 overflow-x-auto">
           <code>{example.code}</code>
          </pre>
         </motion.div>
        ))}
       </div>
      </div>
     </div>
    </section>

    {/* Get Started */}
    <section className="py-20 bg-background">
     <div className="container">
      <div className="max-w-3xl mx-auto text-center">
       <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
       <p className="text-muted-foreground mb-8">
        Sign up for an API key and start integrating Solara into your applications
       </p>
       <button className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
        Get API Key
        <Key className="ml-2 w-4 h-4" />
       </button>
      </div>
     </div>
    </section>
   </main>
   <Footer />
  </div>
 );
} 