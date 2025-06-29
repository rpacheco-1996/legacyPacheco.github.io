import React, { useEffect, useState } from "react";

function Dropdown() {
    const [clinics, setClinics] = useState(["Loading..."]);
    const [doctors, setDoctors] = useState(["Loading..."]);
    const [selectedClinic, setSelectedClinic] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [userAge, setUserAge] = useState("");
    const [apiResponse, setApiResponse] = useState("");

    // Select the list of clinics possible
    useEffect(() => {
        fetch("https://legacybackend-ei8g.onrender.com/getClinics")
            .then((res) => res.json())
            .then((data) => setClinics(data))
            .catch((err) => console.error("Failed to load clinics:", err));
    }, []);

    // Select the list of possible doctors
    // TODO make this filter based on the selected clinic, out of scope for POC
    useEffect(() => {
        fetch("https://legacybackend-ei8g.onrender.com/getDoctors")
            .then((res) => res.json())
            .then((data) => setDoctors(data))
            .catch((err) => console.error("Failed to load doctors:", err));
    }, []);

    // Send the data to the model for prediction
    const handleSubmit = () => {
        const payload = {
            clinic: selectedClinic,
            doctor: selectedDoctor,
            age: userAge,
        };
        setApiResponse("Loading...")

        fetch("https://legacybackend-ei8g.onrender.com/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })
            .then((res) => res.text())
            .then((text) => setApiResponse(text))
            .then((text) => {
                console.log("Prediction:", text);
            });
    };

    return (
        <div>
            <label>
                Select Clinic: 
                <br></br>
                <select value={selectedClinic} onChange={(e) => setSelectedClinic(e.target.value)}>
                    <option value="">-- Select --</option>
                    {clinics.map((opt, idx) => (
                        <option key={idx} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            </label>

            <br></br>

            <label>
                Select Doctor: 
                <br></br>
                <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}>
                    <option value="">-- Select --</option>
                    {doctors.map((opt, idx) => (
                        <option key={idx} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            </label>

            <br></br>

            <label>
                Enter Age: 
                <br></br>
                <input
                    type="text"
                    value={userAge}
                    onChange={(e) => setUserAge(e.target.value)}
                    placeholder="Enter Age"
                />
            </label>


            <br></br>

            <button onClick={handleSubmit} disabled={!selectedClinic || !selectedDoctor || !userAge}>
                Submit
            </button>
            <p><strong>Extensive Responses: </strong> {apiResponse}</p>
        </div>
    );
}

export default Dropdown;