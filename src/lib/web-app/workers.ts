let worker:Worker|null = null;

export function getWorker(): Worker {
    if (worker) {
        return worker;
    }

    worker = new Worker(
        new URL('../../apps/dashboard/worker.ts', import.meta.url),
        {type: 'module'}
    )

    return worker;
}

