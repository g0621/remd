import {Post} from '../post';

it('implements optimistic concurrency control', async (done) => {
    // Create an instance of a post
    const post = Post.build({
        title: 'concert',
        link: 'eheheheh',
        userId: '123',
        about: 'shit man',
        isActive: true
    });

    // Save the post to the database
    await post.save();

    // fetch the post twice
    const firstInstance = await Post.findById(post.id);
    const secondInstance = await Post.findById(post.id);

    // make two separate changes to the posts we fetched
    firstInstance!.set({about: 'no man'});
    secondInstance!.set({about: 'yes man'});

    // save the first fetched ticket
    await firstInstance!.save();

    // save the second fetched ticket and expect an error
    try {
        await secondInstance!.save();
    } catch (err) {
        return done();
    }

    throw new Error('Should not reach this point');
});

it('increments the version number on multiple saves', async () => {
    const ticket = Post.build({
        title: 'concert2',
        link: 'hehehehe',
        userId: '1234',
        about: 'no man',
        isActive: true
    });

    await ticket.save();
    expect(ticket.version).toEqual(0);
    await ticket.save();
    expect(ticket.version).toEqual(1);
    await ticket.save();
    expect(ticket.version).toEqual(2);
});
