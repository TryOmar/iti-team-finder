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
    joinTeamButton: 'Join a Team',
    findMembersButton: 'Find Members',
    editPostButton: 'Edit/Delete My Posts',
    viewListings: 'View All Listings',

    individualFormTitle: 'Looking for a Team',
    teamFormTitle: 'Team Looking for Members',

    fullName: 'Full Name',
    track: 'Track',
    roles: 'Roles',
    skills: 'Skills',
    aboutYou: 'About You',
    phone: 'Phone/WhatsApp',

    teamName: 'Current Members Names',
    teamNamePlaceholder: 'e.g., Mohamed, Omar...',
    currentSize: 'Current Team Size',
    membersNeeded: 'Members Needed',
    requiredRoles: 'Required Roles',
    projectIdea: 'General Notes',
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
    roleOther: 'Other',

    submitButton: 'Submit',
    updateButton: 'Update',
    cancelButton: 'Cancel',
    deleteButton: 'Delete Post',
    confirmDelete: 'Are you sure you want to delete this post? This action cannot be undone.',
    backButton: 'Back',

    individualsTab: 'Individuals',
    teamsTab: 'Teams',
    allTab: 'All',

    filterByTrack: 'Filter by Track',
    filterByRole: 'Filter by Role',
    allTracks: 'All Tracks',
    allRoles: 'All Roles',

    contactViaWhatsApp: 'Contact via WhatsApp',
    membersCount: 'members',
    needsMembers: 'Needs',

    editPostTitle: 'Manage My Posts',
    enterPhoneToEdit: 'Enter your phone number to manage your posts',
    findPost: 'Find Posts',
    noPostFound: 'No posts found with this phone number',
    selectPostToEdit: 'Select a post to edit or delete',
    individualPost: 'Individual Profile',
    teamPost: 'Team Profile',

    required: 'Required',
    optional: 'Optional',

    successIndividual: 'Your post has been submitted successfully!',
    successTeam: 'Your team post has been submitted successfully!',
    successUpdate: 'Your post has been updated successfully!',
    successDelete: 'Your post has been deleted successfully!',
    errorSubmit: 'Failed to submit. Please try again.',
    errorUpdate: 'Failed to update. Please try again.',
    errorDelete: 'Failed to delete. Please try again.',

    phonePlaceholder: '+20 xxx xxx xxxx',
    skillsPlaceholder: 'e.g., React, Node.js, MongoDB',
    descriptionPlaceholder: 'Tell us about yourself, your interests, and what you bring to a team...',
    projectIdeaPlaceholder: 'Mention what you need, your current state, or any other notes (optional)...',
  },
  ar: {
    appTitle: 'مشروع تخرج ITI',
    appSubtitle: 'البحث عن زملاء الفريق',
    joinTeamButton: 'الانضمام لفريق',
    findMembersButton: 'البحث عن أعضاء',
    editPostButton: 'تعديل/حذف منشوراتي',
    viewListings: 'عرض جميع الإعلانات',

    individualFormTitle: 'أبحث عن فريق',
    teamFormTitle: 'فريق يبحث عن أعضاء',

    fullName: 'الاسم الكامل',
    track: 'المسار',
    roles: 'الأدوار',
    skills: 'المهارات',
    aboutYou: 'عن نفسك',
    phone: 'الهاتف/واتساب',

    teamName: 'أسماء أعضاء الفريق',
    teamNamePlaceholder: 'مثال: محمد، عمر...',
    currentSize: 'حجم الفريق الحالي',
    membersNeeded: 'الأعضاء المطلوبين',
    requiredRoles: 'الأدوار المطلوبة',
    projectIdea: 'ملاحظات عامة',
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
    roleOther: 'أخرى',

    submitButton: 'إرسال',
    updateButton: 'تحديث',
    cancelButton: 'إلغاء',
    deleteButton: 'حذف المنشور',
    confirmDelete: 'هل أنت متأكد من حذف هذا المنشور؟ لا يمكن التراجع عن هذا الإجراء.',
    backButton: 'رجوع',

    individualsTab: 'الأفراد',
    teamsTab: 'الفرق',
    allTab: 'الكل',

    filterByTrack: 'تصفية بالمسار',
    filterByRole: 'تصفية بالدور',
    allTracks: 'جميع المسارات',
    allRoles: 'جميع الأدوار',

    contactViaWhatsApp: 'تواصل عبر واتساب',
    membersCount: 'أعضاء',
    needsMembers: 'يحتاج',

    editPostTitle: 'إدارة منشوراتي',
    enterPhoneToEdit: 'أدخل رقم هاتفك لإدارة منشوراتك',
    findPost: 'البحث عن المنشورات',
    noPostFound: 'لم يتم العثور على منشورات بهذا الرقم',
    selectPostToEdit: 'اختر منشوراً لتعديله أو حذفه',
    individualPost: 'ملف شخصي',
    teamPost: 'ملف فريق',

    required: 'مطلوب',
    optional: 'اختياري',

    successIndividual: 'تم إرسال منشورك بنجاح!',
    successTeam: 'تم إرسال منشور فريقك بنجاح!',
    successUpdate: 'تم تحديث منشورك بنجاح!',
    successDelete: 'تم حذف منشورك بنجاح!',
    errorSubmit: 'فشل الإرسال. حاول مرة أخرى.',
    errorUpdate: 'فشل التحديث. حاول مرة أخرى.',
    errorDelete: 'فشل الحذف. حاول مرة أخرى.',

    phonePlaceholder: '+20 xxx xxx xxxx',
    skillsPlaceholder: 'مثال: React, Node.js, MongoDB',
    descriptionPlaceholder: 'أخبرنا عن نفسك واهتماماتك وما تقدمه للفريق...',
    projectIdeaPlaceholder: 'اذكر ما تحتاجه، وضعك الحالي، أو أي ملاحظات أخرى (اختياري)...',
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
