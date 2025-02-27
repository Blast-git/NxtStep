const Course = require('../models/courses');


exports.createCourse = async (req, res) => {
    try {

        // const newCourse = new Course(req.body);
        // await newCourse.save();

        const {user_id,title,provider,description,duration,difficulty_level,price,category,is_certified} = req.body
        const course = await Course.create({user_id,title,provider,description,duration,difficulty_level,price,category,is_certified})
        res.status(201).json({ 
            message: "Course created successfully", 
            course: {
                id: course._id,
                title: course.title,
                provider: course.provider,
                description: course.description,
                duration: course.duration,
                difficulty_level: course.difficulty_level,
                price: course.price,
                category: course.category,
                is_certified: course.is_certified
            }
        })

    } 
    catch (error) {
        res.status(500).json({ 
            success:false,
            message: error.message 
        });
    }
}


exports.getAllCourses = async (req, res) => {
    try {
        const { title, provider, duration, category } = req.query;
        let filter = {};

        if (title) {
            filter.title = { $regex: title, $options: "i" };
        }
        if (provider) {
            filter.provider = { $regex: provider, $options: "i" };
        }
        if (duration) {
            filter.duration = { $regex: duration, $options: "i" };
        }
        if (category) {
            filter.category = { $regex: category, $options: "i" };
        }

        const courses = await Course.find(filter)
        res.status(200).json({
            success:true,
            courses:courses
        });
    } catch (error) {
        res.status(500).json({ 
            success:false,
            message: error.message 
        });
    }
};

exports.updateCourse = async (req, res) => {
    try {

        const updateData = req.body;

        const updatedCourse = await Course.findOneAndUpdate({_id: req.params.id}, updateData, {new:true, runValidators:true})

        if (!updatedCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Course updated successfully",
            course: updatedCourse
        })
    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};


exports.deleteCourse = async (req, res) => {
    try {
        const deletedCourse = await Course.findOneAndDelete(req.params.id);

        if (!deletedCourse) {
            return res.status(404).json({ 
                success: false,
                message: "Course not found" 
            })
        }
            

        res.status(200).json({ 
            success: true,
            message: "Course deleted successfully" 
        })
    }
    catch (error) {
        res.status(500).json({ 
            success:false,
            message: error.message });
    }
}
