import { useTranslation } from 'react-i18next';
import { SimpleSwitcher } from '@/shared/ui';

export function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const toggle = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };
    return (
        <SimpleSwitcher
            rightLabel="ru"
            leftLabel="en"
            defaultValue={i18n.language === 'en' ? 'left' : 'right'}
            onClickHandler={toggle}
        />

    );
}
