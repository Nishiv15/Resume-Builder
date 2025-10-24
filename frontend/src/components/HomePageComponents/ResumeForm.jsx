import React, { useState } from 'react';

// --- SVG Icons ---

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// --- Reusable Form Components ---

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input 
      {...props}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <textarea 
      {...props}
      rows={4}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    />
  </div>
);

const AddButton = ({ onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className="inline-flex items-center gap-2 rounded-md border border-transparent bg-gray-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
  >
    <PlusIcon />
    {children}
  </button>
);

const RemoveButton = ({ onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 hover:text-red-800"
  >
    <TrashIcon />
    {children || 'Remove'}
  </button>
);


// Reusable card component for sections
const FormSection = ({ title, onRemove, children }) => (
  <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
    <div className="flex justify-between items-center p-4 sm:p-6 bg-gray-50 border-b border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="p-1 text-gray-400 rounded-full hover:bg-gray-200 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          aria-label={`Remove ${title} section`}
        >
          <XIcon />
        </button>
      )}
    </div>
    <div className="p-4 sm:p-6 space-y-6">
      {children}
    </div>
  </div>
);

// --- Main Resume Form Component ---

const ResumeForm = () => {
  // Define templates for new items
  const newItemTemplates = {
    education: { id: crypto.randomUUID(), school: '', degree: '', year: '' },
    workExperience: { id: crypto.randomUUID(), company: '', role: '', details: '' },
    projects: { id: crypto.randomUUID(), name: '', description: '' },
    certification: { id: crypto.randomUUID(), name: '', authority: '', year: '' },
    customSections: { id: crypto.randomUUID(), title: 'New Section', content: '' }
  };

  // State for all form data
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      phone: '',
      email: '',
      linkedin: '',
      position: ''
    },
    education: [newItemTemplates.education],
    workExperience: [newItemTemplates.workExperience],
    projects: [newItemTemplates.projects],
    skills: '',
    certification: [newItemTemplates.certification],
    customSections: []
  });

  // State to track which sections are visible
  const [visibleSections, setVisibleSections] = useState({
    education: true,
    workExperience: true,
    projects: true,
    skills: true,
    certification: true
  });

  // --- Handlers for Personal Info ---
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [name]: value }
    }));
  };

  // --- Generic Handlers for Dynamic Sections ---
  const handleAddItem = (section) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], newItemTemplates[section]]
    }));
  };

  const handleRemoveItem = (section, id) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
  };

  const handleItemChange = (section, id, e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].map(item =>
        item.id === id ? { ...item, [name]: value } : item
      )
    }));
  };

  // --- Handlers for Custom Sections ---
  const handleAddCustomSection = () => {
    setFormData(prev => ({
      ...prev,
      customSections: [...prev.customSections, newItemTemplates.customSections]
    }));
  };

  // --- Handler for Section Visibility ---
  const handleSectionToggle = (section) => {
    setVisibleSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Get list of hidden sections to show in the "Add Section" area
  const hiddenSections = Object.keys(visibleSections).filter(key => !visibleSections[key]);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-8">
      {/* --- Personal Info Card --- */}
      <FormSection title="Personal Information">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Input label="Full Name" name="name" value={formData.personalInfo.name} onChange={handlePersonalInfoChange} />
          <Input label="Phone Number" name="phone" value={formData.personalInfo.phone} onChange={handlePersonalInfoChange} />
          <Input label="Email" name="email" type="email" value={formData.personalInfo.email} onChange={handlePersonalInfoChange} />
          <Input label="LinkedIn Profile" name="linkedin" value={formData.personalInfo.linkedin} onChange={handlePersonalInfoChange} />
        </div>
        <Input label="Target Position" name="position" placeholder="e.g., Senior Software Engineer" value={formData.personalInfo.position} onChange={handlePersonalInfoChange} />
      </FormSection>

      {/* --- Work Experience --- */}
      {visibleSections.workExperience && (
        <FormSection title="Work Experience" onRemove={() => handleSectionToggle('workExperience')}>
          <div className="space-y-6">
            {formData.workExperience.map((item, index) => (
              <div key={item.id} className="p-4 border border-gray-200 rounded-lg space-y-4 relative">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Input label="Role" name="role" value={item.role} onChange={(e) => handleItemChange('workExperience', item.id, e)} />
                  <Input label="Company" name="company" value={item.company} onChange={(e) => handleItemChange('workExperience', item.id, e)} />
                </div>
                <Textarea label="Details & Achievements" name="details" value={item.details} onChange={(e) => handleItemChange('workExperience', item.id, e)} />
                {formData.workExperience.length > 1 && (
                  <div className="text-right">
                    <RemoveButton onClick={() => handleRemoveItem('workExperience', item.id)} />
                  </div>
                )}
              </div>
            ))}
          </div>
          <AddButton onClick={() => handleAddItem('workExperience')}>Add Experience</AddButton>
        </FormSection>
      )}

      {/* --- Education --- */}
      {visibleSections.education && (
        <FormSection title="Education" onRemove={() => handleSectionToggle('education')}>
          <div className="space-y-6">
            {formData.education.map((item) => (
              <div key={item.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Input label="School / University" name="school" value={item.school} onChange={(e) => handleItemChange('education', item.id, e)} />
                  <Input label="Degree / Field of Study" name="degree" value={item.degree} onChange={(e) => handleItemChange('education', item.id, e)} />
                </div>
                <Input label="Graduation Year" name="year" value={item.year} onChange={(e) => handleItemChange('education', item.id, e)} />
                {formData.education.length > 1 && (
                  <div className="text-right">
                    <RemoveButton onClick={() => handleRemoveItem('education', item.id)} />
                  </div>
                )}
              </div>
            ))}
          </div>
          <AddButton onClick={() => handleAddItem('education')}>Add Education</AddButton>
        </FormSection>
      )}

      {/* --- Projects --- */}
      {visibleSections.projects && (
        <FormSection title="Projects" onRemove={() => handleSectionToggle('projects')}>
          <div className="space-y-6">
            {formData.projects.map((item) => (
              <div key={item.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
                <Input label="Project Name" name="name" value={item.name} onChange={(e) => handleItemChange('projects', item.id, e)} />
                <Textarea label="Description" name="description" value={item.description} onChange={(e) => handleItemChange('projects', item.id, e)} />
                {formData.projects.length > 1 && (
                  <div className="text-right">
                    <RemoveButton onClick={() => handleRemoveItem('projects', item.id)} />
                  </div>
                )}
              </div>
            ))}
          </div>
          <AddButton onClick={() => handleAddItem('projects')}>Add Project</AddButton>
        </FormSection>
      )}

      {/* --- Skills --- */}
      {visibleSections.skills && (
        <FormSection title="Skills" onRemove={() => handleSectionToggle('skills')}>
          <Textarea 
            label="Skills" 
            name="skills"
            placeholder="e.g., JavaScript, React, Node.js, Project Management..."
            value={formData.skills} 
            onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))} 
          />
        </FormSection>
      )}

      {/* --- Certification --- */}
      {visibleSections.certification && (
        <FormSection title="Certifications" onRemove={() => handleSectionToggle('certification')}>
          <div className="space-y-6">
            {formData.certification.map((item) => (
              <div key={item.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Input label="Certificate Name" name="name" value={item.name} onChange={(e) => handleItemChange('certification', item.id, e)} />
                  <Input label="Issuing Authority" name="authority" value={item.authority} onChange={(e) => handleItemChange('certification', item.id, e)} />
                </div>
                <Input label="Year" name="year" value={item.year} onChange={(e) => handleItemChange('certification', item.id, e)} />
                {formData.certification.length > 1 && (
                  <div className="text-right">
                    <RemoveButton onClick={() => handleRemoveItem('certification', item.id)} />
                  </div>
                )}
              </div>
            ))}
          </div>
          <AddButton onClick={() => handleAddItem('certification')}>Add Certificate</AddButton>
        </FormSection>
      )}

      {/* --- Custom Sections --- */}
      {formData.customSections.map((item, index) => (
        <FormSection 
          key={item.id} 
          title="Custom Section"
          onRemove={() => handleRemoveItem('customSections', item.id)}
        >
          <Input 
            label="Section Title" 
            name="title"
            value={item.title} 
            onChange={(e) => handleItemChange('customSections', item.id, e)} 
          />
          <Textarea 
            label="Content" 
            name="content"
            value={item.content} 
            onChange={(e) => handleItemChange('customSections', item.id, e)} 
          />
        </FormSection>
      ))}

      {/* --- Add Section Controls --- */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-lg font-medium text-gray-900">Manage Sections</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {hiddenSections.map(section => (
            <button
              key={section}
              type="button"
              onClick={() => handleSectionToggle(section)}
              className="inline-flex items-center gap-2 rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200"
            >
              <PlusIcon />
              {/* Simple function to format the name */}
              Add {section.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </button>
          ))}
          <button
            type="button"
            onClick={handleAddCustomSection}
            className="inline-flex items-center gap-2 rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200"
          >
            <PlusIcon />
            Add Custom Section
          </button>
        </div>
      </div>
      
      {/* --- Submit Button --- */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => console.log('Final Form Data:', formData)}
          className="rounded-md bg-gray-700 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
        >
          Generate Resume
        </button>
      </div>

    </div>
  );
};

export default ResumeForm;