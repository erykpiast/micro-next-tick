process.nextTick(null);

process.nextTick(function() {
    console.log('second queued call!');

    process.nextTick(function() {
        console.log('nested call is working!');
    });

    throw new Error('dupa!');
});

process.nextTick(function() {
    console.log('third queued call!');
});

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);

    return true;
});
