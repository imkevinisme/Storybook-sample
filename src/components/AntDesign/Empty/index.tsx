import React, { FC } from "react";

interface Props {
    type?: 'basic' | 'simple' | 'color';
    text?: string;
    wrapperClassName?: string;
    textClassName?: string;
}

const AntEmpty:FC<Props> = ({
    type = 'basic',
    text = 'No Data',
    wrapperClassName = 'flex justify-center items-center gap-3 flex-col p-5',
    textClassName = 'lead text-muted text-center',
}) => {

    const renderEmpty = () => {
        switch(type) {
            case 'basic':
                return <BasicIcon />

            case 'simple':
                return <SimpleIcon />

            case 'color':
                return <ColorIcon />

            default:
                return <BasicIcon />
        }
    }

    return (
        <div className={wrapperClassName}>
            <div>{renderEmpty()}</div>
            <div>
                <p className={textClassName} dangerouslySetInnerHTML={{
                    __html: text
                }}></p>
            </div>
        </div>
    );
};

export default AntEmpty;




const BasicIcon = () => (
    <svg width="184" height="152" viewBox="0 0 184 152" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g transform="translate(24 31.67)"><ellipse fill-opacity=".8" fill="#F5F5F7" cx="67.797" cy="106.89" rx="67.797" ry="12.668"></ellipse><path d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z" fill="#AEB8C2"></path><path d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z" fill="url(#linearGradient-1)" transform="translate(13.56)"></path><path d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" fill="#F5F5F7"></path><path d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z" fill="#DCE0E6"></path></g><path d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z" fill="#DCE0E6"></path><g transform="translate(149.65 15.383)" fill="#FFF"><ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815"></ellipse><path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"></path></g></g></svg>
);


const SimpleIcon = () => (
    <svg width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fill-rule="evenodd"><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse><g fill-rule="nonzero" stroke="#d9d9d9"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa"></path></g></g></svg>
);

const ColorIcon = () => (
    <svg width="130" height="80" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient x1="52.348%" y1="74.611%" x2="52.348%" y2="-17.635%" id="a"><stop stop-color="#DEDEDE" stop-opacity="0" offset="0%"/><stop stop-color="#A9A9A9" stop-opacity=".3" offset="100%"/></linearGradient><linearGradient x1="44.79%" y1="100%" x2="44.79%" y2="0%" id="b"><stop stop-color="#FFF" stop-opacity="0" offset="0%"/><stop stop-color="#96A1C5" stop-opacity=".373" offset="100%"/></linearGradient><linearGradient x1="50%" y1="100%" x2="50%" y2="-19.675%" id="c"><stop stop-color="#FFF" stop-opacity="0" offset="0%"/><stop stop-color="#919191" stop-opacity=".15" offset="100%"/></linearGradient><linearGradient x1="50%" y1="0%" x2="50%" y2="44.95%" id="d"><stop stop-color="#5389F5" offset="0%"/><stop stop-color="#416FDC" offset="100%"/></linearGradient><linearGradient x1="63.345%" y1="100%" x2="63.345%" y2="-5.316%" id="e"><stop stop-color="#DCE9FF" offset="0%"/><stop stop-color="#B6CFFF" offset="100%"/></linearGradient><linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="f"><stop stop-color="#7CA5F7" offset="0%"/><stop stop-color="#C4D6FC" offset="100%"/></linearGradient></defs><g transform="translate(-1.866 .364)" fill="none" fill-rule="evenodd"><path d="M27.94 14.864c1.326-4.192 2.56-6.802 3.7-7.831 3.157-2.848 7.522-1.298 8.45-1.076 3.26.782 2.2-4.364 4.997-5.41 1.864-.697 3.397.155 4.6 2.556C50.752.863 52.375-.163 54.556.02c3.272.277 4.417 11.328 8.913 8.909 4.497-2.42 10.01-2.973 12.365.623.509.778.704-.429 4.166-4.55C83.462.88 86.914-.936 93.996 1.464c3.22 1.09 5.868 4.045 7.947 8.864 0 6.878 5.06 10.95 15.178 12.213 15.179 1.895 3.397 18.214-15.178 22.993-18.576 4.78-61.343 7.36-84.551-4.716C1.92 32.769 5.436 24.117 27.939 14.864z" fill="url(#a)" opacity=".8"/><ellipse fill="url(#b)" cx="66" cy="69.166" rx="27.987" ry="6.478"/><path d="M113.25 77.249c-21.043 5.278-92.87-.759-100.515-3.516-3.721-1.343-7.075-3.868-10.061-7.576a2.822 2.822 0 0 1 2.198-4.593h125.514c2.605 6.938-3.107 12.166-17.136 15.685z" fill="url(#c)" opacity=".675"/><g fill-rule="nonzero"><path d="M43.396 12.098L33.825.906a2.434 2.434 0 0 0-1.837-.86h-20.58c-.706 0-1.377.324-1.837.86L0 12.098v6.144h43.396v-6.144z" fill="url(#d)" transform="translate(44.08 39.707)"/><path d="M40.684 18.468L32.307 8.72a2.136 2.136 0 0 0-1.622-.725H12.711c-.617 0-1.22.256-1.622.725l-8.377 9.748v5.354h37.972v-5.354z" fill="url(#e)" transform="translate(44.08 39.707)"/><path d="M43.396 25.283c0 .853-.384 1.62-.99 2.134l-.123.1a2.758 2.758 0 0 1-1.67.56H2.784c-.342 0-.669-.062-.971-.176l-.15-.06A2.802 2.802 0 0 1 0 25.282V12.165h10.529c1.163 0 2.1.957 2.1 2.118v.015c0 1.162.948 2.099 2.111 2.099h13.916a2.113 2.113 0 0 0 2.111-2.107c0-1.166.938-2.125 2.1-2.125h10.53z" fill="url(#f)" transform="translate(44.08 39.707)"/></g></g></svg>
);
