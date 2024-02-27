import { useNavigate } from "react-router";
import { auth } from "../../firebase/config"
import { useState, useEffect } from "react";
import AuthDialogBox from "../AuthDialogBox";
import BookTrial from "./bookTrial";

function TeacherCard({ teacher }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(auth.currentUser);
    const [openDialogBox, setOpenDialogBox] = useState(false);
    const [openBookTrialWindow, setOpenBookTrialWindow] = useState(false);

    // create page for that teacher profile -------------------------------

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => setUser(authUser));
        return () => unsubscribe()
    }, []);

    function navigateToProfile() {
        navigate(`/teachers/${teacher.uid}`)
    }

    function handleCloseBookTrialWindow() {
        setOpenBookTrialWindow(false);
    }

    function handleBookTrial(e) {
        e.stopPropagation();
        user ? setOpenBookTrialWindow(true) : setOpenDialogBox(true);
    }

    return (
        <div
            className="flex border-2 hover:scale-[1.01] transition-all ease-in-out border-slate-500 p-5 gap-5 rounded-lg"
        >
            <div className="w-[60%] flex flex-col gap-5">
                <div className="flex gap-5">
                    <div className="shrink-0 w-48 h-48 overflow-hidden">
                        <img
                            src={teacher.imageLink}
                            alt={teacher.name}
                            className="w-full h-full rounded-md object-center aspect-[initial]"
                        />
                    </div>
                    <div className="flex flex-col">
                        <h3
                            className="font-bold capitalize text-2xl hover:underline cursor-pointer mb-3"
                            onClick={navigateToProfile}
                        >
                            {teacher.name}
                        </h3>
                        <p className="mb-1 text-[var(--light-gray)]">
                            {teacher.position}
                        </p>
                        <p className="text-sm mb-8 text-[var(--dark-gray)]">
                            {teacher.experience} years of teaching exprience
                        </p>
                        <p className="line-clamp-2 w-full text-xs">
                            {teacher.bio}
                        </p>
                    </div>
                </div>
                <p className="text-[var(--light-gray)]">
                    <span className="font-semibold">Course: </span>
                    {teacher.courseName}
                </p>
                <div className="flex gap-5 justify-between">
                    <p className="line-clamp-1 w-1/2 text-sm">
                        💼 <span className="font-semibold text-base">For: {" "}</span>
                        {teacher.preRequisities}
                    </p>
                    <p className="">
                        🎯 {teacher.demoCount} demo classes
                    </p>
                </div>
            </div>
            <div className="w-[40%] flex flex-col pl-5 border-l-[1px] border-[var(--light-gray)] border-solid">
                <div className="flex flex-col gap-2 text-sm capitalize mb-7">
                    <p>
                        📞 {teacher.sessionCount}x Sessions Per Week
                    </p>
                    <p>
                        ☑️ Task Assignment and resources
                    </p>
                    <p>
                        ♾️ Unlimited chat during course
                    </p>
                </div>

                <p className="mb-1">
                    <span className="text-2xl">
                        ₹{teacher.individualFee} {" "}
                    </span>
                    individual/month
                </p>
                <p>
                    <span className="text-2xl">
                        ₹{teacher.groupFee} {" "}
                    </span>
                    group/month
                </p>

                <button
                    className="border-2 my-3 box-border border-[var(--light-gray)] py-2 hover:bg-white hover:text-black hover:font-semibold transition-all ease-in-out rounded-md"
                    onClick={navigateToProfile}
                >
                    View Profile
                </button>
                <button
                    className="bg-blue-600 py-2 rounded-md hover:scale-105 transition-all ease-in-out"
                    onClick={handleBookTrial}
                >
                    Book Trial
                </button>
            </div>
            {openDialogBox && <AuthDialogBox setOpenDialogBox={setOpenDialogBox} />}
            {user && <BookTrial user={user} teacher={teacher} open={openBookTrialWindow} handleClose={handleCloseBookTrialWindow} />}
        </div>
    )
}

export default TeacherCard;