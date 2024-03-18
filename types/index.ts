export interface IAccountFormInputs {
    name: string;
    username: string;
    bio: string;
    profilePhotoUrl: string;
    profileCompleted: boolean;
}

export interface IThreadFormInputs {
    title: string;
    content: string;
    image?: string;
    tags: string[];
}
