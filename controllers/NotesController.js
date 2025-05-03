import Note from '../models/Note.js';
import { generateSummary, generateTags } from '../services/AIService.js';


export const createNote = async (req, res) => {

    try {

        const { title, content, tags } = req.body;

     
        const summary = await generateSummary(content);


        if(tags.length < 5){
            const newTags = await generateTags(content, 5- tags.length);
            
            newTags.forEach(tag => {
                    tags.push(tag);
            });
        }

        const newNote = await Note.create({ title, content, tags, summary, userId: req.userId });
        const note = sanitizeNote(newNote); // Remove userId from the response
        res.status(201).json(note);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getAllNotes = async (req, res) => {

    try{
        
        const search = req.query.search || '';
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
      
        const filter = {
          userId: req.userId,
          $or: [
            { title: new RegExp(search, 'i') },
            { content: new RegExp(search, 'i') },
            { tags: new RegExp(search, 'i') }
          ]
        };
      
        const totalNotes = await Note.countDocuments(filter);
        
        const notes = await Note.find(filter)
          .select('_id title summary tags updatedAt') // Only return needed fields
          .sort({ updatedAt: -1 })
          .skip((page - 1) * limit)
          .limit(limit);
        
        const totalPages = Math.ceil(totalNotes / limit);
        res.json({
          total: totalNotes,
          page,
          limit,
          totalPages,
          notes
        });
    } 
    catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getNoteById = async (req, res) => {

    try {
        const { id } = req.params;
        const note = await Note.findOne({ _id: id, userId: req.userId });
        if (!note) return res.status(404).json({ message: 'Note not found' });
        const noteDetails = sanitizeNote(note) // Remove userId from the response
        res.json(noteDetails);

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateNote = async(req, res) => {
    
    try {
        const {id} = req.params;
        const { title, content, tags } = req.body.note;
        const userId = req.userId;
        const note = await Note.findOne({ _id: id, userId });
        if (!note) return res.status(404).json({ message: 'Note not found' });

        const summary = await generateSummary(content);
        
        if(tags.length < 5){
            const newTags = await generateTags(content, tags, 5 - tags.length);
            tags.push(...newTags);
        }
        const updatedNote = await Note.findByIdAndUpdate(id, { title, content, tags, summary }, { new: true });
        const noteDetails = sanitizeNote(updatedNote);
        res.status(200).json(noteDetails);

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const deleteNote = async (req, res) => {
    try{
        const {id} = req.params;
        const userId = req.userId;
        const note = await Note.findOneAndDelete( {_id : id,  userId : userId });
        if (!note) return res.status(404).json({ message: 'Note not found or unauthorized' });
        res.json({ message: 'Note deleted successfully' });
    } catch(err){
        res.status(500).json({ message: 'Internal server error' });
    }
}


const sanitizeNote = (note) => {
    const sanitizedNote = note.toObject();
    delete sanitizedNote.userId; // Remove userId from the response
    return sanitizedNote;
}