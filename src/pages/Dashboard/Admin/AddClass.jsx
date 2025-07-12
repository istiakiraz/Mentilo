import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import img from "../../../assets/svg/Workout-cuate.svg";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddClass = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [benefitInput, setBenefitInput] = useState("");
  const [benefits, setBenefits] = useState([]);
  const [selectedTrainers, setSelectedTrainers] = useState([]);

  // Fetch approved trainers
  const { data: trainers = [] } = useQuery({
    queryKey: ["approvedTrainers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/trainers?status=approved");
      return res.data;
    },
  });

  // Difficulty options
  const difficultyOptions = [
    { value: "Beginner", label: "Beginner" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Advanced", label: "Advanced" },
  ];

  // Exercise types
  const exerciseTypes = [
    "Yoga",
    "Cardio",
    "Zumba",
    "Weight Training",
    "Aerobics",
  ];

  // Trainer options
  const trainerOptions = trainers.map((trainer) => ({
    ...trainer,
    label: `${trainer.name} (${trainer.skills?.join(", ")})`,
    value: trainer._id,
  }));

  const handleAddBenefit = () => {
    if (benefitInput.trim()) {
      setBenefits([...benefits, benefitInput.trim()]);
      setBenefitInput("");
    }
  };

  const handleRemoveBenefit = (index) => {
    const updated = [...benefits];
    updated.splice(index, 1);
    setBenefits(updated);
  };

  const onSubmit = async (data) => {
    if (selectedTrainers.length === 0) {
      return Swal.fire("Error", "Please select at least one trainer", "error");
    }

    if (benefits.length === 0) {
      return Swal.fire("Error", "Please add at least one benefit", "error");
    }

    const classData = {
      title: data.title,
      description: data.description,
      difficulty: selectedDifficulty?.value,
      exerciseTypes: selectedTypes,
      benefits,
      trainers: selectedTrainers.map((t) => ({
        _id: t._id,
        email: t.email,
        photo: t.photo,
      })),
    };

    console.log(classData);

    try {
      const res = await axiosSecure.post("/classes", classData);
      if (res.data.insertedId) {
        Swal.fire("Success", "Class added successfully", "success");
        reset();
        setSelectedDifficulty(null);
        setSelectedTypes([]);
        setBenefits([]);
        setSelectedTrainers([]);
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className=" mx-auto py-10">
      <h2 className="text-3xl lg:text-5xl font-title font-bold text-center text-primary mb-4">
        Add New Class
      </h2>
      <p className="text-center mb-5  text-gray-500 w-11/12 lg:w-8/12 mx-auto">
        Create and publish a new class to help learners grow. Provide a clear
        title, description, difficulty level, exercise types, benefits, and
        select qualified trainers. Well-detailed classes attract more students
        and ensure a better learning experience.
      </p>
      <div className="flex flex-col lg:flex-row items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 shadow-[9px_9px_0px_0px_#432365] gap-6 border-2 bg-primary/10 border-primary  p-6 rounded-xl "
        >
          {/* Title */}
          <div>
            <label className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="w-full border px-4 py-2 rounded focus:outline-primary"
              placeholder="Enter class title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              {...register("description", { required: true })}
              className="w-full border px-4 py-2 rounded focus:outline-primary"
              placeholder="Enter class description"
            ></textarea>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block font-semibold mb-1">Difficulty</label>
            <Select
              options={difficultyOptions}
              value={selectedDifficulty}
              onChange={setSelectedDifficulty}
              className="text-black"
              required
            />
          </div>

          {/* Exercise Types */}
          <div>
            <label className="block font-semibold mb-1">Exercise Types</label>
            <div className="flex flex-wrap gap-3">
              {exerciseTypes.map((type) => (
                <label key={type} className="flex gap-1 items-center">
                  <input
                    type="checkbox"
                    value={type}
                    {...register("exerciseTypes", { required: true })}
                    checked={selectedTypes.includes(type)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedTypes([...selectedTypes, type]);
                      } else {
                        setSelectedTypes(
                          selectedTypes.filter((t) => t !== type)
                        );
                      }
                    }}
                  />
                  {type}
                </label>
              ))}
            </div>
            {errors.exerciseTypes && (
              <p className="text-red-500 text-sm">Select at least one type</p>
            )}
          </div>

          {/* Benefits */}
          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">Benefits</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={benefitInput}
                onChange={(e) => setBenefitInput(e.target.value)}
                className="border px-4 py-2 rounded w-full"
                placeholder="Add benefit"
              />
              <button type="button" onClick={handleAddBenefit}>
                <a className="relative inline-block cursor-pointer text-lg group">
                  <span className="relative z-10 block md:px-5 px-3 py-2 md:py-2 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-primary rounded-lg group-hover:text-secondary">
                    <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                    <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-primary group-hover:-rotate-180 ease"></span>
                    <span className="relative font-title text-sm md:text-[16px] flex items-center gap-2 ">
                      {" "}
                      Add
                    </span>
                  </span>
                  <span className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-primary rounded-lg group-hover:mb-0 group-hover:mr-0" />
                </a>
              </button>
            </div>
            <ul className="flex flex-wrap gap-2">
              {benefits.map((b, idx) => (
                <li
                  key={idx}
                  className="bg-primary/20 px-3 py-1 rounded-full text-sm"
                >
                  {b}{" "}
                  <button onClick={() => handleRemoveBenefit(idx)}>✕</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Trainers */}
          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">Select Trainers</label>
            <Select
              isMulti
              options={trainerOptions}
              value={selectedTrainers}
              onChange={setSelectedTrainers}
              className="text-black z-20"
            />
          </div>

          <div className="md:col-span-2 text-center">
            <button type="submit">
              <a className="relative inline-block cursor-pointer text-lg group">
                <span className="relative z-10 block md:px-5 px-3 py-2 md:py-2 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-primary rounded-lg group-hover:text-secondary">
                  <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                  <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-primary group-hover:-rotate-180 ease"></span>
                  <span className="relative font-title text-sm md:text-[16px] flex items-center gap-2 ">
                    {" "}
                    Add Class
                  </span>
                </span>
                <span className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-primary rounded-lg group-hover:mb-0 group-hover:mr-0" />
              </a>
            </button>
          </div>
        </form>
        <img className="w-[600px]" src={img} alt="normal svg" />
      </div>
    </div>
  );
};

export default AddClass;
