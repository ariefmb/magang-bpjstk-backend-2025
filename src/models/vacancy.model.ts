// import mongoose from "mongoose";
// import { VacancyInterface } from "../interfaces/vacancy.interface";

// const vacancySchema = new mongoose.Schema<VacancyInterface>(
//     {
//         vacancy_id: {
//             type: String,
//             required: true,
//             unique: true,
//         },
//         title: {
//             type: String,
//             required: true,
//             trim: true,
//         },
//         status: {
//             type: String,
//             required: true,
//             enum: ["Open", "open", "Closed", "closed", "Pending", "pending"],
//         },
//         unit: {
//             type: String,
//             required: true,
//             trim: true,
//         },
//         mentor_name: {
//             type: String,
//             required: true,
//             trim: true,
//         },
//         contact: {
//             type: String,
//             required: true,
//         },
//         position: {
//             type: String,
//             required: true,
//             trim: true,
//         },
//         quota: {
//             type: Number,
//             required: true,
//             min: 1,
//             default: 1,
//         },
//         tw: {
//             type: Number,
//         },
//         duration: {
//             type: Number,
//             required: true,
//             min: 1,
//             default: 1,
//         },
//         city: {
//             type: String,
//             required: true,
//         },
//         working_model: {
//             type: String,
//             required: true,
//             enum: ["Work At Office", "work at office", "Work From Home", "work from home"],
//             default: "Work At Office",
//         },
//         open_vacancy: {
//             type: Date,
//             required: true,
//             default: Date.now,
//         },
//         close_vacancy: {
//             type: Date,
//             required: true,
//             default: Date.now,
//         },
//         description: {
//             type: String,
//             trim: true,
//         },
//     },
//     { timestamps: true }
// );

// const vacancyModel = mongoose.model<VacancyInterface>("vacancy", vacancySchema);

// export default vacancyModel;
