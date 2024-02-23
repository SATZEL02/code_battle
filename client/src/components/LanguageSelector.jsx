import { LANGUAGE_VERSIONS } from "../assets/languagesSupported"
const languages = Object.entries(LANGUAGE_VERSIONS)

export const LanguageSelector = ({Language,onLanguageSelect}) => {
    return (
        <div className="my-2">
            <p className="text-slate-600 font-semibold">Language:</p>
            <select className="rounded-lg bg-gray-700 text-white " id="language" onChange={(e)=>onLanguageSelect(e.target.value)}>
                {languages.map(([language,version]) => (
                    <option className={Language===language ? "text-green-500 bg-gray-700 ":"text-blue-500 bg-transparent"} key={language} value={language}>{version}</option>
                ))}
            </select>
        </div>
    )
}