import React from 'react';

const PollResult = ({ results, totalVotes, poll }) => {
    return (
        <section className="pollResult">
            <h3>{poll.question} - Poll Results</h3>
            {results.map((result) => (
                <div key={result.id} className="resultSingle">
                    <svg className="circle">
                        <circle cx="50%" cy="50%" r="48%" />
                        <circle
                            cx="50%"
                            cy="50%"
                            r="48%"
                            strokeDasharray="100"
                            strokeDashoffset={100 - (result.vote_count / totalVotes) * 100}
                        />
                    </svg>
                    <h3>{result.name}</h3>
                    <p>{((result.vote_count / totalVotes) * 100).toFixed(1)}%</p>
                </div>
            ))}
        </section>
    );
};

export default PollResult;