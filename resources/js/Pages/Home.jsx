import React, { useState, useEffect } from "react";
import avatar from "../images/avatar-female.jpg";
import axios from "axios";
import { Head } from '@inertiajs/react';

const Avatar = () => (
    <div className="avatarImg">
        <img src={avatar} alt="Avatar" />
    </div>
);

const SocialShare = ({ poll }) => {
    const shareUrl = window.location.href; // Get current page URL
    const shareText = `Vote results for: ${poll.question}`;

    return (
        <div className="social-share mt-4 text-center">
            <h5 className="mb-3">বন্ধুদের সাথে শেয়ার করুনঃ</h5>
            <div className="d-flex justify-content-center gap-3">
                <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        shareUrl
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                >
                    <i className="fa-brands fa-facebook-f"></i> Facebook
                </a>
                <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        shareUrl
                    )}&text=${encodeURIComponent(shareText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-info"
                >
                    <i className="fa-brands fa-twitter"></i> Twitter
                </a>
                <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                        shareText + " " + shareUrl
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-success"
                >
                    <i className="fa-brands fa-whatsapp"></i> WhatsApp
                </a>
            </div>
        </div>
    );
};

const PollOption = ({ name, percentage }) => {
    const [displayPercentage, setDisplayPercentage] = useState(0);

    useEffect(() => {
        let currentPercentage = 0; // Ensure it's initialized as a number
        const increment = percentage / 50; // Adjust speed by changing the divisor

        const interval = setInterval(() => {
            currentPercentage += increment;
            if (currentPercentage >= percentage) {
                currentPercentage = percentage; // Stop at the target percentage
                clearInterval(interval);
            }
            setDisplayPercentage(Number(currentPercentage).toFixed(2)); // Ensure valid number
        }, 20); // Adjust interval duration for speed

        return () => clearInterval(interval);
    }, [percentage]);

    return (
        <div className="resultSingle">
            <span className="percentage mb-3">
                {new Intl.NumberFormat("bn-BD").format(displayPercentage)}%
            </span>
            <h3 className="mt-3">{name}</h3>
        </div>
    );
};

const PollResults = ({ options, totalVotes, resetForm, poll }) => {
    const [displayVotes, setDisplayVotes] = useState(0);

    useEffect(() => {
        let currentVotes = 0;
        const increment = totalVotes / 50;
        const interval = setInterval(() => {
            currentVotes += increment;
            if (currentVotes >= totalVotes) {
                currentVotes = totalVotes;
                clearInterval(interval);
            }
            setDisplayVotes(Math.floor(currentVotes));
        }, 20);
        return () => clearInterval(interval);
    }, [totalVotes]);

    const optionArray = Object.values(options);

    return (
        <section className="pollResult">
            <div className="justify-content-center">
                {/* Display the poll question */}
                <h2 className="resultQuestion mb-4">
                    <i className="fa-solid fa-comment"></i> {poll.question}
                </h2>

                <article className="resultTxt mt-3">
                    <span>সর্বমোট প্রাপ্ত ভোটঃ</span>
                    <h3>
                        {new Intl.NumberFormat("bn-BD").format(displayVotes)}
                    </h3>
                </article>
            </div>

            <div className="d-flex justify-content-center gap-4 mt-5 flex-wrap">
                {optionArray.map((option) => (
                    <PollOption
                        key={option.id}
                        name={option.option}
                        percentage={(
                            (option.votes_count / totalVotes) *
                            100
                        ).toFixed(2)}
                    />
                ))}
            </div>

            {/* Include SocialShare for sharing */}
            <SocialShare poll={poll} />

            <div className="mx-auto d-flex justify-content-center mt-4">
                <button onClick={resetForm} className="backButton w-25">
                    <span>ফেরত যান</span>
                </button>
            </div>
        </section>
    );
};

const PollForm = ({ poll, options, onVote }) => (
    <form id="stepForm">
        <div className="wrapper">
            <h2 className="tag">
                <i className="fa-solid fa-comment"></i> {poll.question}
            </h2>
            <fieldset id="step1">
                <h1 className="main-heading">আপনি কি এই বিষয়টির সাথে একমত?</h1>
                {options.map((option) => (
                    <div className="radioField" key={option.id}>
                        <input type="radio" name="social" value={option.id} />
                        <label>{option.name}</label>
                        <button type="button">
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>
                ))}
                <div className="mx-auto d-flex justify-content-center mt-4">
                    <button
                        type="button"
                        id="sub"
                        className="voteNow w-50"
                        onClick={onVote}
                    >
                        <span>ভোট দিন</span>
                    </button>
                </div>
            </fieldset>
        </div>
    </form>
);

const Home = ({ poll, options }) => {
    const metaTitle = "সাম্প্রতিক ইস্যুতে আপনার মতামত দিন"; // Static title
    const metaDescription = poll?.question || "Default meta description"; // Poll question or fallback

    const [voted, setVoted] = useState(false);
    const [voteResults, setVoteResults] = useState({});
    const [totalVotes, setTotalVotes] = useState(0);

    const handleVote = async () => {
        try {
            const selectedOption = document.querySelector(
                'input[name="social"]:checked'
            );

            if (!selectedOption) {
                alert("Please select an option.");
                return;
            }

            const response = await axios.post("/submit-vote", {
                poll_id: poll.id,
                option_id: selectedOption.value,
            });

            const options = response.data.options.original.options;
            const totalVotes = response.data.options.original.totalVotes;

            setVoteResults(options);
            setTotalVotes(totalVotes);
            setVoted(true);
        } catch (error) {
            console.error("Error submitting vote:", error);
        }
    };

    const resetForm = () => {
        setVoted(false);
        setVoteResults({});
        setTotalVotes(0);
    };

    return (
        <>
            <Head>
				<title>{metaTitle}</title>
				<meta name="description" content={metaDescription} />
				<meta property="og:title" content={metaTitle} />
				<meta property="og:description" content={metaDescription} />
            </Head>
            <main className="overflow-hidden">
                <div className="row g-0" id="form">
                    <div
                        className={`col-md-5 tab-none ${voted ? "d-none" : ""}`}
                    >
                        <div className="sideArea">
                            <Avatar />
                        </div>
                    </div>

                    <div
                        className={`col-md-7 tab-100 ${voted ? "d-none" : ""}`}
                    >
                        <PollForm
                            poll={poll}
                            options={options}
                            onVote={handleVote}
                        />
                    </div>
                </div>
                {voted && (
                    <PollResults
                        options={voteResults}
                        totalVotes={totalVotes}
                        resetForm={resetForm}
                        poll={poll} // Pass poll object here
                    />
                )}
            </main>
        </>
    );
};

export default Home;