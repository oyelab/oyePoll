import React from 'react';

const ResultPage = ({ poll, results, totalVotes }) => {
    return (
        <main className="overflow-hidden">
            <section className="pollResult">
                <article className="resultTxt">
                    <h3>{poll.question} - Poll Results</h3>
                </article>

                <div className="d-flex justify-content-evenly gap-4 my-5 flex-wrap">
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
                            <h3 className="resultHeading">{result.name}</h3>
                            <span className="percentage">
                                {((result.vote_count / totalVotes) * 100).toFixed(1)}%
                            </span>
                        </div>
                    ))}
                </div>

                <a href="/" className="mx-auto">
                    <button className="voteNow mt-5">
                        <span>Undo Vote?</span>
                    </button>
                </a>
            </section>
        </main>
    );
};

export default ResultPage;