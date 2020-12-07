import mongoose from 'mongoose';
import {updateIfCurrentPlugin} from 'mongoose-update-if-current';

interface PostAttrs {
    userId: string,
    link: string,
    title: string,
    about: string,
    isActive: boolean
}

interface PostDoc extends mongoose.Document {
    title: string;
    userId: string;
    link: string;
    about: string;
    version: number;
    isActive: boolean;
}

interface PostModel extends mongoose.Model<PostDoc> {
    build(attrs: PostAttrs): PostDoc;
}

const postSchema = new mongoose.Schema(
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
        about: {
            type: String,
            required: true
        },
        isActive: {
            type: Boolean,
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
postSchema.set('versionKey', 'version');
postSchema.plugin(updateIfCurrentPlugin);



postSchema.statics.build = (attrs: PostAttrs) => {
    return new Post(attrs);
};

const Post = mongoose.model<PostDoc, PostModel>('Post', postSchema);

export {Post};
