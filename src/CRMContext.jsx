// contexts/CRMContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  source: string;
  tags: string[];
  createdAt: string;
  lastContact: string;
  value: number;
  status: 'active' | 'inactive' | 'prospect';
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  value: number;
  probability: number;
  stage: 'prospect' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  assignedTo: string;
  createdAt: string;
  expectedClose: string;
  aiScore: number;
  notes: string[];
}

export interface AIInsight {
  id: string;
  type: 'prediction' | 'recommendation' | 'alert';
  title: string;
  description: string;
  confidence: number;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

interface CRMContextType {
  contacts: Contact[];
  leads: Lead[];
  insights: AIInsight[];
  addContact: (contact: Omit<Contact, 'id' | 'createdAt'>) => void;
  updateContact: (id: string, updates: Partial<Contact>) => void;
  deleteContact: (id: string) => void;
  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'aiScore'>) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
  loading: boolean;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

export const CRMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API data loading
    setTimeout(() => {
      setContacts([
        {
          id: '1',
          name: 'Sarah Johnson',
          email: 'sarah@techcorp.com',
          phone: '+1-555-0123',
          company: 'TechCorp Inc.',
          position: 'CTO',
          source: 'Website',
          tags: ['decision-maker', 'tech-savvy'],
          createdAt: '2024-01-15',
          lastContact: '2024-01-20',
          value: 50000,
          status: 'active'
        },
        {
          id: '2',
          name: 'Michael Chen',
          email: 'mchen@startup.io',
          phone: '+1-555-0456',
          company: 'Startup.io',
          position: 'Founder',
          source: 'Referral',
          tags: ['founder', 'early-adopter'],
          createdAt: '2024-01-10',
          lastContact: '2024-01-18',
          value: 25000,
          status: 'prospect'
        }
      ]);

      setLeads([
        {
          id: '1',
          name: 'Enterprise Deal - TechCorp',
          email: 'sarah@techcorp.com',
          company: 'TechCorp Inc.',
          value: 150000,
          probability: 75,
          stage: 'negotiation',
          assignedTo: 'John Doe',
          createdAt: '2024-01-15',
          expectedClose: '2024-02-28',
          aiScore: 82,
          notes: ['Strong interest in enterprise features', 'Budget approved']
        },
        {
          id: '2',
          name: 'Startup Package - Startup.io',
          email: 'mchen@startup.io',
          company: 'Startup.io',
          value: 25000,
          probability: 60,
          stage: 'proposal',
          assignedTo: 'Jane Smith',
          createdAt: '2024-01-10',
          expectedClose: '2024-02-15',
          aiScore: 68,
          notes: ['Price sensitive', 'Needs quick implementation']
        }
      ]);

      setInsights([
        {
          id: '1',
          type: 'prediction',
          title: 'High Close Probability',
          description: 'TechCorp deal has 85% chance of closing this month based on engagement patterns',
          confidence: 85,
          priority: 'high',
          createdAt: '2024-01-20'
        },
        {
          id: '2',
          type: 'recommendation',
          title: 'Follow-up Opportunity',
          description: 'Contact Michael Chen - optimal time for follow-up based on activity analysis',
          confidence: 72,
          priority: 'medium',
          createdAt: '2024-01-19'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const addContact = (contactData: Omit<Contact, 'id' | 'createdAt'>) => {
    const newContact: Contact = {
      ...contactData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setContacts(prev => [...prev, newContact]);
  };

  const updateContact = (id: string, updates: Partial<Contact>) => {
    setContacts(prev => prev.map(contact => 
      contact.id === id ? { ...contact, ...updates } : contact
    ));
  };

  const deleteContact = (id: string) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt' | 'aiScore'>) => {
    const aiScore = Math.floor(Math.random() * 40) + 60; // Mock AI score
    const newLead: Lead = {
      ...leadData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      aiScore
    };
    setLeads(prev => [...prev, newLead]);
  };

  const updateLead = (id: string, updates: Partial<Lead>) => {
    setLeads(prev => prev.map(lead => 
      lead.id === id ? { ...lead, ...updates } : lead
    ));
  };

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(lead => lead.id !== id));
  };

  return (
    <CRMContext.Provider value={{
      contacts,
      leads,
      insights,
      addContact,
      updateContact,
      deleteContact,
      addLead,
      updateLead,
      deleteLead,
      loading
    }}>
      {children}
    </CRMContext.Provider>
  );
};

export const useCRM = () => {
  const context = useContext(CRMContext);
  if (!context) {
    throw new Error('useCRM must be used within CRMProvider');
  }
  return context;
};
