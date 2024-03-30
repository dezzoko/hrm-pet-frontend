import { Navbar } from '@/widgets/Navbar';

export function App() {
//  const { t, i18n: {changeLanguage, language} } = useTranslation();

    //  const [currentLanguage, setCurrentLanguage] = useState(language);

    //  const handleChangeLanguage = () => {
    //    const newLanguage = currentLanguage === "en" ? "ru" : "en";
    //    setCurrentLanguage(newLanguage);
    //    changeLanguage(newLanguage);
    //    localStorage.setItem('lng',newLanguage)
    //  }
    return (
    //    <div className="App">
    //      <h1>
    //        Our Translated Header:
    //        {t('test')}
    //      </h1>
    //      <h3>

    //        Current Language: {currentLanguage}
    //      </h3>
    //      <button
    //         type="button"
    //         onClick={handleChangeLanguage}
    //      >
    //       Change Language
    //      </button>
    //    </div>
    //     eslint-disable-next-line i18next/no-literal-string
        <Navbar />
    );
}
