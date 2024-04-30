import { useTranslation } from 'react-i18next';

export function SettingsPage() {
    const { t } = useTranslation();
    return (
        <div>
            {t('user_settings')}
        </div>
    );
}
