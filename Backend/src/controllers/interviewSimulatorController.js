const InterviewSimulation = require('../models/interviewsimulator');


exports.startSimulation = async (req, res) => {
    try {
        const { user_id, category, difficulty_level } = req.body;

        if (!user_id || !category || !difficulty_level) {
            return res.status(400).json({ 
                success:false,
                error: 'Fill complete details' });
        }

        const simulationId = `sim_${Date.now()}`;
        const newSimulation = new InterviewSimulation({
            id: simulationId,
            user_id,
            category,
            difficulty_level,
            start_time: new Date(),
            end_time: null,
            score: null, 
            //recording_url: null,
            feedback: null
        });
        const savedSimulation = await newSimulation.save();

        res.status(201).json({
            success: true,
            message: 'Simulation started',
            simulation:savedSimulation });


    } 
    catch (error) {
        res.status(500).json({ 
            success: false,
            error: 'Error starting simulation', 
            message: error.message});
    }
}

exports.endSimulation = async (req, res) => {
    try {
        const {id} = req.params;
        const {score,recording_url} =req.body;

        if (!score) {
            return res.status(400).json({ 
                success:false,
                message: "Score are required" 
            });
        }


        const updatedSimulation = await InterviewSimulation.findOneAndUpdate(
            {id},{ 
                end_time: new Date(),
                score,
                // recording_url
            },{new:true}
        );

        if (!updatedSimulation) {
            return res.status(404).json({ 
                error: 'Simulation not found' 
            });
        }

        res.status(200).json({ 
            message: 'Simulation ended successfully', 
            simulation: updatedSimulation 
        });
    } 
    catch (error) {
        res.status(500).json({ 
            message: 'Error ending simulation', 
            details: error.message });
    }


}

