import { randomScrambleForEvent } from 'cubing/scramble';

const scramble = ref<string | undefined>(undefined);

export default function () {
    async function loadScramble() {
        const result = await randomScrambleForEvent('333');
        scramble.value = result.toString();
    }

    onMounted(async () => {
        if (!scramble.value) await loadScramble();
    });

    return {
        scramble,
        loadScramble,
    };
}
