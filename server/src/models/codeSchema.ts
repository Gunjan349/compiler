import mongoose from 'mongoose';

interface ICodeSchema{
    code : {
        html: string;
        css : string;
        javascript : string;
    }
}

const CodeSchema = new mongoose.Schema<ICodeSchema>({
    code: {
        html: String,
        css: String,
        javascript: String,
    }
})

export const Code = mongoose.model('Code', CodeSchema);