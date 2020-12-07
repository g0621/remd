import mongoose from 'mongoose';
import {updateIfCurrentPlugin} from 'mongoose-update-if-current';

interface PersonalAttrs {
    userId: string,
    link: string,
    title: string,
    note: string,
    createdAt: Date,
    lastDone: Date,
    nextDo: Date,
    currentCounter: number
    isActive: boolean
}

interface PersonalDoc extends mongoose.Document {
    userId: string,
    link: string,
    title: string,
    note: string,
    createdAt: Date,
    lastDone: Date,
    nextDo: Date,
    version: number
    currentCounter: number
    isActive: boolean
}

interface PersonalModel extends mongoose.Model<PersonalDoc> {
    build(attrs: PersonalAttrs): PersonalDoc;
}

const personalSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        note: {
            type: String,
            required: true
        },
        isActive: {
            type: Boolean,
            required: true
        },
        createdAt: {
            type: mongoose.Schema.Types.Date,
            required: true
        },
        lastDone: {
            type: mongoose.Schema.Types.Date,
            required: true
        },
        nextDo: {
            type: mongoose.Schema.Types.Date,
            required: true
        },
        currentCounter: {
            type: Number,
            required: true
        }
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    }
);
personalSchema.set('versionKey', 'version');
personalSchema.plugin(updateIfCurrentPlugin);


personalSchema.statics.build = (attrs: PersonalAttrs) => {
    return new Personal(attrs);
};

const Personal = mongoose.model<PersonalDoc, PersonalModel>('Personal', personalSchema);

export {Personal};
