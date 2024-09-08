import * as React from 'react';
import classNames from 'classnames';

import { DynamicComponent } from '../../components-registry';
import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';

export default function FormBlock(props) {
    const formRef = React.createRef<HTMLFormElement>();
    const [status, setStatus] = React.useState('');
    const [error, setError] = React.useState('');
    const { elementId, className, fields = [], submitLabel, styles = {} } = props;

    if (fields.length === 0) {
        return null;
    }

    const handleSubmit = (event) => {
      event.preventDefault();
    
      const myForm = event.target;
      const formData = new FormData(myForm);
      
    const params = new URLSearchParams();
    for (const pair of formData.entries()) {
      params.append(String(pair[0]), String(pair[1]));
    }
    fetch("/", {
      method: "POST",
      body: params.toString()
    })
    .then(() => alert("Thank you for your submission"))
    .catch((error) => alert(error));

        
    }
    

    return (
        <form
            className={classNames('sb-component', 'sb-component-block', 'sb-component-form-block', className)}
            name={elementId}
            id={elementId}
            onSubmit={handleSubmit}
            ref={formRef}
        >
            <div className="grid sm:grid-cols-2 sm:gap-x-4">
                <input type="hidden" name="form-name" value={elementId} />
                {fields.map((field, index) => {
                    return <DynamicComponent key={index} {...field} />;
                })}
            </div>
            <div className={classNames('mt-4', styles.submitLabel?.textAlign ? mapStyles({ textAlign: styles.submitLabel?.textAlign }) : null)}>
                <button type="submit" className="sb-component sb-component-block sb-component-button sb-component-button-primary">
                    {submitLabel}
                </button>
            </div>
            {status === 'ok' && (
                <div className="mt-4 text-green-600">
                    <SuccessIcon />
                    <p>Form submitted successfully!</p>
                </div>
            )}
            {status === 'error' && (
                <div className="mt-4 text-red-600">
                    <ErrorIcon />
                    <p>Error: {error}</p>
                </div>
            )}
        </form>
    );
}

function SuccessIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
    );
}

function ErrorIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
    );
}
