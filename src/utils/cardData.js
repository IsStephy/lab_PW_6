export const CARD_THEMES = {
  animals: {
    label: 'Animals', icon: '🐾',
    emojis: ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐸','🐙','🦋','🦄','🐬','🦅','🐘','🦒','🦓','🐊','🐢','🦎','🐠','🐡','🦈','🐧','🦉','🦚','🦜'],
  },
  food: {
    label: 'Food', icon: '🍕',
    emojis: ['🍕','🍔','🍟','🌮','🍜','🍣','🍩','🎂','🍦','🍇','🍓','🍊','🍋','🍎','🍑','🥑','🌽','🥕','🧁','🍫','🍬','🍭','🥐','🥞','🧇','🥗','🍱','🥟','🧆','🍲','🥘','🍛'],
  },
  nature: {
    label: 'Nature', icon: '🌿',
    emojis: ['🌸','🌺','🌻','🌹','🌷','🍀','🌿','🌊','🌙','⭐','🌈','🌋','🏔️','🌅','🌄','🌠','❄️','🍁','🍂','🌾','🌵','🎋','🌍','☀️','⛅','🌤️','🌦️','🌧️','⛈️','🌩️','🌪️','🌫️'],
  },
  sports: {
    label: 'Sports', icon: '⚽',
    emojis: ['⚽','🏀','🏈','⚾','🎾','🏐','🏉','🎱','🏓','🏸','🥊','🎯','🏹','🎳','🏋️','⛷️','🏂','🏊','🚴','🤾','🏇','🧗','🥋','⛳','🎿','🛷','🏄','🤽','🚵','🤿','🧘','🤼'],
  },
}

export function generateCards(cardTheme, pairs) {
  const emojis = CARD_THEMES[cardTheme].emojis.slice(0, pairs)
  const cards = emojis.flatMap((emoji, i) => [
    { id: `${i}-a`, pairId: String(i), emoji },
    { id: `${i}-b`, pairId: String(i), emoji },
  ])
  return shuffle(cards)
}

function shuffle(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
