import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    appTitle: 'ITI Graduation Project',
    appSubtitle: 'Teammate Finder',
    heroDescription: 'Connect with talented ITI students to form your dream graduation project team. Find teammates with the right skills or join an existing team looking for members.',
    joinTeamButton: 'Join a Team',
    findMembersButton: 'Find Members',
    editPostButton: 'Edit My Post',
    viewListings: 'View All Listings',

    individualFormTitle: 'Looking for a Team',
    teamFormTitle: 'Team Looking for Members',

    fullName: 'Full Name',
    track: 'Track',
    roles: 'Roles',
    skills: 'Skills',
    aboutYou: 'About You',
    phone: 'Phone/WhatsApp',

    teamName: 'Team Name',
    currentSize: 'Current Team Size',
    membersNeeded: 'Members Needed',
    requiredRoles: 'Required Roles',
    projectIdea: 'Project Idea',
    contactNumber: 'Contact Number',

    selectTrack: 'Select Track',
    selectRoles: 'Select Roles',
    selectRequiredRoles: 'Select Required Roles',

    trackPWD: 'Professional Web Development',
    trackOS: 'Open Source',
    trackUIUX: 'UI/UX Design',

    roleFrontend: 'Frontend Developer',
    roleBackend: 'Backend Developer',
    roleFullstack: 'Fullstack Developer',
    roleUIUX: 'UI/UX Designer',
    roleMobile: 'Mobile Developer',
    roleDevOps: 'DevOps',
    roleQA: 'QA/Testing',

    submitButton: 'Submit',
    updateButton: 'Update',
    cancelButton: 'Cancel',
    backButton: 'Back',

    individualsTab: 'Individuals',
    teamsTab: 'Teams',

    filterByTrack: 'Filter by Track',
    filterByRole: 'Filter by Role',
    allTracks: 'All Tracks',
    allRoles: 'All Roles',

    contactViaWhatsApp: 'Contact via WhatsApp',
    membersCount: 'members',
    needsMembers: 'Needs',

    editPostTitle: 'Edit My Post',
    enterPhoneToEdit: 'Enter your phone number to edit your post',
    findPost: 'Find Post',
    noPostFound: 'No post found with this phone number',

    required: 'Required',
    optional: 'Optional',

    successIndividual: 'Your post has been submitted successfully!',
    successTeam: 'Your team post has been submitted successfully!',
    successUpdate: 'Your post has been updated successfully!',
    errorSubmit: 'Failed to submit. Please try again.',
    errorUpdate: 'Failed to update. Please try again.',

    phonePlaceholder: '+20 xxx xxx xxxx',
    skillsPlaceholder: 'e.g., React, Node.js, MongoDB',
    descriptionPlaceholder: 'Tell us about yourself, your interests, and what you bring to a team...',
    projectIdeaPlaceholder: 'Describe your project idea (optional)...',
  },
  ar: {
    appTitle: 'مشروع تخرج ITI',
    appSubtitle: 'البحث عن زملاء الفريق',
    heroDescription: 'تواصل مع طلاب ITI الموهوبين لتكوين فريق مشروع التخرج المثالي. ابحث عن زملاء بالمهارات المناسبة أو انضم لفريق موجود يبحث عن أعضاء.',
    joinTeamButton: 'الانضمام لفريق',
    findMembersButton: 'البحث عن أعضاء',
    editPostButton: 'تعديل منشوري',
    viewListings: 'عرض جميع الإعلانات',

    individualFormTitle: 'أبحث عن فريق',
    teamFormTitle: 'فريق يبحث عن أعضاء',

    fullName: 'الاسم الكامل',
    track: 'المسار',
    roles: 'الأدوار',
    skills: 'المهارات',
    aboutYou: 'عن نفسك',
    phone: 'الهاتف/واتساب',

    teamName: 'اسم الفريق',
    currentSize: 'حجم الفريق الحالي',
    membersNeeded: 'الأعضاء المطلوبين',
    requiredRoles: 'الأدوار المطلوبة',
    projectIdea: 'فكرة المشروع',
    contactNumber: 'رقم التواصل',

    selectTrack: 'اختر المسار',
    selectRoles: 'اختر الأدوار',
    selectRequiredRoles: 'اختر الأدوار المطلوبة',

    trackPWD: 'تطوير الويب الاحترافي',
    trackOS: 'المصادر المفتوحة',
    trackUIUX: 'تصميم واجهة وتجربة المستخدم',

    roleFrontend: 'مطور واجهات أمامية',
    roleBackend: 'مطور خلفي',
    roleFullstack: 'مطور متكامل',
    roleUIUX: 'مصمم واجهات',
    roleMobile: 'مطور تطبيقات الموبايل',
    roleDevOps: 'DevOps',
    roleQA: 'ضمان الجودة/الاختبار',

    submitButton: 'إرسال',
    updateButton: 'تحديث',
    cancelButton: 'إلغاء',
    backButton: 'رجوع',

    individualsTab: 'الأفراد',
    teamsTab: 'الفرق',

    filterByTrack: 'تصفية بالمسار',
    filterByRole: 'تصفية بالدور',
    allTracks: 'جميع المسارات',
    allRoles: 'جميع الأدوار',

    contactViaWhatsApp: 'تواصل عبر واتساب',
    membersCount: 'أعضاء',
    needsMembers: 'يحتاج',

    editPostTitle: 'تعديل منشوري',
    enterPhoneToEdit: 'أدخل رقم هاتفك لتعديل منشورك',
    findPost: 'البحث عن المنشور',
    noPostFound: 'لم يتم العثور على منشور بهذا الرقم',

    required: 'مطلوب',
    optional: 'اختياري',

    successIndividual: 'تم إرسال منشورك بنجاح!',
    successTeam: 'تم إرسال منشور فريقك بنجاح!',
    successUpdate: 'تم تحديث منشورك بنجاح!',
    errorSubmit: 'فشل الإرسال. حاول مرة أخرى.',
    errorUpdate: 'فشل التحديث. حاول مرة أخرى.',

    phonePlaceholder: '+20 xxx xxx xxxx',
    skillsPlaceholder: 'مثال: React, Node.js, MongoDB',
    descriptionPlaceholder: 'أخبرنا عن نفسك واهتماماتك وما تقدمه للفريق...',
    projectIdeaPlaceholder: 'اوصف فكرة مشروعك (اختياري)...',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
