import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const PollForm = ({ poll, options }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    // Handle option selection
    const handleSelection = (optionId) => {
        setSelectedOption(optionId);
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedOption) {
            alert('Please select an option!');
            return;
        }

        // Submit the vote via Inertia POST
        Inertia.post('/polls/vote', {
            poll_id: poll.id,
            option: selectedOption,
        });
    };

    return (
        <div className="col-md-7 tab-100">
            <form id="stepForm" onSubmit={handleSubmit} className="wrapper">
                <h5 className="tag">
                    <i className="fa-solid fa-chevron-right"></i> &nbsp;
                    {poll.question}
                </h5>

                <fieldset id="step1">
                    <h1 className="main-heading">আপনি কি এই বিষয়ের সাথে একমত?</h1>

                    <div className="radioFieldGroup">
                        {options.map((option) => (
                            <div key={option.id} className="radioField">
                                <input
                                    type="radio"
                                    id={`option-${option.id}`}
                                    name="option"
                                    value={option.id}
                                    checked={selectedOption === option.id}
                                    onChange={() => handleSelection(option.id)}
                                />
                                <label htmlFor={`option-${option.id}`}>{option.name}</label>
                            </div>
                        ))}
                    </div>

                    <button type="submit" id="sub" className="voteNow">
                        <span>See Result</span>
                    </button>
                </fieldset>
            </form>
        </div>
    );
};

export default PollForm;