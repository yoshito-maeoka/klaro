import React from 'react'
import { AccordionToggle } from './icons';

export default class AppItem extends React.Component {
    state = {
        show: false
    }

    toggle = () => {
        this.setState({ show: !this.state.show });
    }

    render(){
        const {checked, onToggle, name, title, description, t} = this.props
        const required = this.props.required || false
        const optOut = this.props.optOut || false
        const purposes = this.props.purposes || []
        const onChange = (e) => {
            onToggle(e.target.checked)
        }

        const id = `app-item-${name}`
        const purposesText = purposes.map((purpose) => t(['purposes', purpose])).join(", ")
        const optOutText = optOut ? <span className="cm-opt-out" title={t(['app', 'optOut', 'description'])}>{t(['app', 'optOut', 'title'])}</span> : ''
        const requiredText = required ? <span className="cm-required" title={t(['app', 'required', 'description'])}>{t(['app', 'required', 'title'])}</span> : ''

        let purposesContent
        if (purposes.length > 0)
            purposesContent = <p className="purposes">{t(['app', purposes.length > 1 ? 'purposes' : 'purpose'])}: {purposesText}</p>

        return <div>
            <input id={id} className={"cm-app-input"+(required ? " required" : "")} aria-describedby={`${id}-description`} disabled={required} checked={checked || required} type="checkbox" onChange={onChange} />
            <label htmlFor={id} className="cm-app-label" {...(required ? {tabIndex: "0"} : {})}>
                <span className="cm-app-title">{title || t([name, 'title'])}</span>{requiredText}{optOutText}
                <span className="switch">
                    <div className="slider round active"></div>
                </span>
            </label>
            <span className={"accordion-toggle " + (this.state.show ? 'show' : 'hide')} onClick={this.toggle}>
                <AccordionToggle />
            </span>
            <div id={`${id}-description`} className={this.state.show ? 'visible': 'hidden' }>
                <p className="cm-app-description" dangerouslySetInnerHTML={{
                    __html: description || t([name, 'description']) }} >
                </p>
                {purposesContent}
            </div>
        </div>
    }

}
