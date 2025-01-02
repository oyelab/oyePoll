import React from 'react';
import { Inertia } from '@inertiajs/inertia'; 
import SideArea from '../Components/SideArea';
import PollForm from '../Components/PollForm';

const Home = ({ poll, options }) => {
    return (
        <main className="overflow-hidden">
            <div className="row" id="form">
                <div className="col-md-5 tab-none">
                    {/* Side Area */}
                    <SideArea />
                </div>
                <div className="col-md-7 tab-100">
                    {/* Poll Form */}
                    <PollForm poll={poll} options={options} />
                </div>
            </div>
        </main>
    );
};

export default Home;