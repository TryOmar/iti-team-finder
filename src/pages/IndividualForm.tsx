import { useState, FormEvent } from 'react';
import { ArrowLeft, UserPlus, Phone, Briefcase, Code, FileText, Trash2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigation } from '../contexts/NavigationContext';
import { supabase } from '../lib/supabase';

const tracks = ['PWD', 'OS', 'UI-UX'];
const roles = [
  'roleFrontend',
  'roleBackend',
  'roleFullstack',
  'roleUIUX',
  'roleMobile',
  'roleDevOps',
  'roleQA',
];

export default function IndividualForm() {
  const { t } = useLanguage();
  const { navigateTo, editData } = useNavigation();

  const isEditMode = editData?.type === 'individual';
  const initialData = isEditMode ? editData.data : null;

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    track: initialData?.track || '',
    roles: initialData?.roles || [],
    skills: initialData?.skills || '',
    description: initialData?.description || '',
    phone: initialData?.phone || '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleRoleToggle = (role: string) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter((r: string) => r !== role)
        : [...prev.roles, role],
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (isEditMode) {
        const { error } = await supabase
          .from('individuals')
          .update({
            name: formData.name,
            track: formData.track,
            roles: formData.roles,
            skills: formData.skills,
            description: formData.description,
          })
          .eq('id', initialData.id);

        if (error) throw error;
        setMessage({ type: 'success', text: t('successUpdate') });
      } else {
        const { error } = await supabase.from('individuals').insert([
          {
            name: formData.name,
            track: formData.track,
            roles: formData.roles,
            skills: formData.skills,
            description: formData.description,
            phone: formData.phone,
            language: t('language'),
          },
        ]);

        if (error) throw error;
        setMessage({ type: 'success', text: t('successIndividual') });
      }

      setTimeout(() => {
        navigateTo('landing');
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage({ type: 'error', text: isEditMode ? t('errorUpdate') : t('errorSubmit') });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id || !window.confirm(t('confirmDelete'))) return;
    
    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase
        .from('individuals')
        .delete()
        .eq('id', initialData.id);

      if (error) throw error;
      setMessage({ type: 'success', text: t('successDelete') });
      
      setTimeout(() => {
        navigateTo('landing');
      }, 2000);
    } catch (error) {
      console.error('Error deleting post:', error);
      setMessage({ type: 'error', text: t('errorDelete') });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigateTo('landing')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">{t('backButton')}</span>
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-red-100 p-3 rounded-lg">
              <UserPlus className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{t('individualFormTitle')}</h2>
          </div>

          {message && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4" />
                {t('fullName')} <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Briefcase className="w-4 h-4" />
                {t('track')} <span className="text-red-600">*</span>
              </label>
              <select
                required
                value={formData.track}
                onChange={e => setFormData({ ...formData, track: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">{t('selectTrack')}</option>
                {tracks.map(track => (
                  <option key={track} value={track}>
                    {t(`track${track.replace('-', '')}`)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <Code className="w-4 h-4" />
                {t('roles')} <span className="text-red-600">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {roles.map(role => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleRoleToggle(t(role))}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      formData.roles.includes(t(role))
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {t(role)}
                  </button>
                ))}
              </div>
            </div>


            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4" />
                {t('projectIdea')} <span className="text-gray-500 text-xs">({t('optional')})</span>
              </label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder={t('projectIdeaPlaceholder')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4" />
                {t('phone')} <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                placeholder={t('phonePlaceholder')}
                disabled={isEditMode}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="submit"
                disabled={loading || formData.roles.length === 0}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white font-medium py-3 rounded-lg transition-colors"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>
                ) : isEditMode ? (
                  t('updateButton')
                ) : (
                  t('submitButton')
                )}
              </button>

              {isEditMode && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading}
                  className="w-full bg-white border border-red-200 text-red-600 hover:bg-red-50 font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  {t('deleteButton')}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
