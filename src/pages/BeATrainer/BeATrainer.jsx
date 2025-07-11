import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import trainerPic from '../../assets/svg/PersonalTrainer-cuate.svg'
import axios from 'axios';

const daysOptions = [
  { value: 'Sun', label: 'Sunday' },
  { value: 'Mon', label: 'Monday' },
  { value: 'Tue', label: 'Tuesday' },
  { value: 'Wed', label: 'Wednesday' },
  { value: 'Thu', label: 'Thursday' },
  { value: 'Fri', label: 'Friday' },
  { value: 'Sat', label: 'Saturday' }
];

const skillOptions = ['Yoga', 'Cardio', 'Zumba', 'Weight Training', 'Aerobics'];
const slotOptions = [
  'Morning (7 AM - 10 AM)',
  'Evening (4 PM - 6 PM)',
  'Night (7 PM - 10 PM)'
];

const BeATrainer = () => {


  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });




  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [profilePic, setProfilePic] = useState("");

  const [selectedDays, setSelectedDays] = React.useState([]);
  const [selectedSkills, setSelectedSkills] = React.useState([]);
  const [customErrors, setCustomErrors] = React.useState({});
  const [selectedSlots, setSelectedSlots] = React.useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {

    const errorObj = {};

  if (selectedSkills.length === 0) {
    errorObj.skills = 'Please select at least one skill.';
  }
  if (selectedDays.length === 0) {
    errorObj.days = 'Please select at least one available day.';
  }

  if (selectedSlots.length === 0) {
  errorObj.slots = 'Please select at least one time slot.';
}

   setCustomErrors(errorObj);

  if (Object.keys(errorObj).length > 0) return;


    const formData = {
      ...data,
      email: user?.email,
      skills: selectedSkills,
      availableDays: selectedDays.map(day => day.value),
      status: 'pending',
      photo: profilePic,
      availableTime: selectedSlots,
      feedback: "",
      createdAt: new Date().toISOString()
    };

    console.log(formData);

    try {
      const res = await axiosSecure.post('/trainers', formData);
      if(res.data.message === "trainer already applied"){
        Toast.fire({
          icon: "error",
          title: `You already applied `,
          background: "#f9f6fc",
          iconColor: "#432365",
        });

      }
      if (res.data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Application submitted!',
          text: 'Your trainer application is now pending review.'
        });
        // reset();
        setSelectedDays([]);
        setSelectedSkills([]);
    setCustomErrors({});
    setSelectedSlots([])

    

      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Submission failed!',
        text: 'Something went wrong.'
      });
    }
  };

  

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedSkills(prev => [...prev, value]);
    } else {
      setSelectedSkills(prev => prev.filter(skill => skill !== value));
    }
  };

  const handleImgUpload = async (e) => {
    const image = e.target.files[0];
    // console.log(image);

    const formData = new FormData();
    formData.append("image", image);

    const imgURL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_Key
    }`;

    const res = await axios.post(imgURL, formData);

    setProfilePic(res.data.data.url);
    // console.log(res.data.data.url);
  };

  const handleSlotChange = (e) => {
  const { value, checked } = e.target;
  if (checked) {
    setSelectedSlots(prev => [...prev, value]);
  } else {
    setSelectedSlots(prev => prev.filter(slot => slot !== value));
  }
};


  return (
    <div className=" w-11/12 lg:w-10/12 flex flex-col lg:flex-row justify-between items-center mx-auto p-6 bg-white  rounded-xl my-10">
     <div>
         <h2 className="text-3xl font-bold mb-6 font-title lg:text-4xl lg:font-extrabold text-primary">Become a Trainer</h2>
         <p className='mb-4 text-gray-500 pb-3 border-b-2 border-gray-100 ' >Share your skills, inspire others, and earn doing what you love.
Join Mentilo as a trainer and grow your impact — one session at a time.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Full Name */}
        <div>
          <label className="block mb-2 font-semibold">Full Name</label>
          <input
            {...register('name', { required: true })}
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none  focus:ring-primary"
            placeholder="Your full name"
          />
          {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
        </div>

        {/* Email (Read-only) */}
        <div>
          <label className="block mb-2 font-semibold">Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="w-full px-4 py-2 bg-gray-100 focus:ring-primary border rounded-md"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block mb-2 font-semibold">Age</label>
          <input
            {...register('age', { required: true })}
            type="number"
            className="w-full px-4 py-2 focus:ring-primary border rounded-md"
            placeholder="Your age"
          />
          {errors.age && <p className="text-red-500 text-sm">Age is required</p>}
        </div>

        {/* Profile Image */}
        {/* <div>
          <label className="block mb-2 font-semibold">Profile Image URL</label>
          <input
            {...register('photo', { required: true })}
            type="url"
            className="w-full px-4 py-2 border rounded-md"
            placeholder="https://example.com/image.jpg"
          />
          {errors.photo && <p className="text-red-500 text-sm">Image URL is required</p>}
        </div> */}

         <div className="mb-1 flex items-center gap-3 sm:mb-2">
                {profilePic && (
                  <img
                    className="rounded-full size-14 mt-3 border-2 border-primary"
                    src={profilePic}
                    alt="User Pic"
                  />
                )}

                <div>
                  <label className="inline-block mb-2 text-gray-500 ml-2 font-medium">
                    Upload Your Profile Image
                  </label>

                  <input
                    placeholder="Picture"
                    onChange={handleImgUpload}
                    type="file"
                    className="file:mr-4 overflow-x-hidden file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold  hover:file:bg-violet-100 file:text-primary  flex-grow w-full h-12 px-4 transition duration-200 bg-white  rounded  appearance-none focus:border-deep-purple-accent-400   "
                  />
                </div>
              </div>

        

        {/* Skills (checkbox) */}
        <div className="md:col-span-1">
          <label className="block mb-2 font-semibold">Skills</label>
          <div className="flex flex-wrap gap-4">
            {skillOptions.map(skill => (
              <label key={skill} className="flex focus:ring-primary items-center gap-2">
                <input
                  type="checkbox"
                  value={skill}
                  onChange={handleSkillChange}
                  checked={selectedSkills.includes(skill)}
                />
             
                {skill}
              </label>
            ))}
          </div>
             {customErrors.skills && (
  <p className="text-red-500 text-sm mt-1">{customErrors.skills}</p>
)}
        </div>

        {/* Years of Experience */}
<div>
  <label className="block mb-2 font-semibold">Years of Experience</label>
  <input
    {...register('experience', { required: true })}
    type="number"
    className="w-full px-4 py-2 border focus:ring-primary rounded-md"
    placeholder="Ex: 3"
  />
  {errors.experience && <p className="text-red-500 text-sm">Experience is required</p>}
</div>

        

        {/* Available Days using react-select */}
        <div className="md:col-span-1">
          <label className="block mb-2 font-semibold">Available Days</label>
          <Select
            options={daysOptions}
            isMulti
            closeMenuOnSelect={false}
            onChange={setSelectedDays}
            value={selectedDays}
            isSearchable={false}
            className="text-black focus:ring-primary"
          />
          {customErrors.days && (
  <p className="text-red-500 text-sm mt-1">{customErrors.days}</p>
)}
        </div>

      
        

{/* Available Time Slots */}
<div className="md:col-span-1">
  <label className="block mb-2 font-semibold">Available Time Slots</label>
  <div className="space-y-2">
    {slotOptions.map((slot, index) => (
      <label key={index} className="flex items-center gap-2">
        <input
          type="checkbox"
          value={slot}
          checked={selectedSlots.includes(slot)}
          onChange={handleSlotChange}
          className="text-blue-600 focus:ring-blue-500"
        />
        <span className="text-gray-800">{slot}</span>
      </label>
    ))}
  </div>
  {customErrors.slots && (
    <p className="text-red-500 text-sm mt-1">{customErrors.slots}</p>
  )}
</div>

   {/*Facebook Profile */}
        <div>
          <label className="block mb-2 font-semibold">Facebook Profile</label>
          <input
            {...register('facebook', { required: true })}
            type="url"
            value={'https://www.facebook.com/istiak.iraz'}
            className="w-full px-4 py-2 border rounded-md focus:outline-none  focus:ring-primary"
            placeholder="https://facebook.com/yourprofile"
          />
          {errors.facebook && <p className="text-red-500 text-sm">Facebook Profile is required</p>}
        </div>

           {/* Instagram  */}
        <div>
          <label className="block mb-2 font-semibold">Instagram Profile</label>
          <input
            {...register('instagram', { required: true })}
            type="url"
            value={"https://www.instagram.com/iraz_mahmud/"}
            className="w-full px-4 py-2 border rounded-md focus:outline-none  focus:ring-primary"
            placeholder="https://instagram.com/yourprofile"
          />
          {errors.instagram  && <p className="text-red-500 text-sm">Instagram Profile is required</p>}
        </div>

        {/* Other Info */}
        <div className="md:col-span-2">
          <label className="block mb-2 font-semibold">Other Info</label>
          <textarea
            {...register('otherInfo', { required: true })}
            className="w-full px-4 py-2 focus:ring-primary border rounded-md"
            rows="4"
            placeholder="Any additional information..."
          />
           {errors.otherInfo && <p className="text-red-500 text-sm">Other Info is required</p>}
        </div>

        

        {/* Submit Button */}
        <div className="md:col-span-2 text-center">
         
           <button  type="submit">
            <a className="relative inline-block cursor-pointer text-lg group">
              <span className="relative z-10 block md:px-5 px-3 py-2 md:py-2 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-primary rounded-lg group-hover:text-secondary">
                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-primary group-hover:-rotate-180 ease"></span>
                <span className="relative font-title text-sm md:text-[16px] flex items-center gap-2 ">
                  {" "}
                   Apply
                </span>
              </span>
              <span className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-primary rounded-lg group-hover:mb-0 group-hover:mr-0" />
            </a>
          </button>
        </div>
      </form>
     </div>
     <div>
        <img className='w-[800px]' src={trainerPic} alt="trainer pic" />
     </div>
    </div>
  );
};

export default BeATrainer;
