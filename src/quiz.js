import { shuffle, insertAtRandom, insertAfter } from './utils.js'

/**
 * 答题控制器
 */
export function createQuiz(questions, config, onComplete) {
  const mainQuestions = shuffle(questions.main)
  const smokeGateQ1 = questions.special.find((q) => q.id === config.smokeGate.questionId)
  const smokeGateQ2 = questions.special.find((q) => q.id === 'smoke_gate_q2')

  let queue = insertAtRandom(mainQuestions, smokeGateQ1)
  let current = 0
  let answers = {}
  let isSmoker = false

  const els = {
    fill: document.getElementById('progress-fill'),
    text: document.getElementById('progress-text'),
    qText: document.getElementById('question-text'),
    options: document.getElementById('options'),
  }

  function totalCount() {
    return queue.length
  }

  function updateProgress() {
    const pct = (current / totalCount()) * 100
    els.fill.style.width = pct + '%'
    els.text.textContent = `${current} / ${totalCount()}`
  }

  function renderQuestion() {
    const q = queue[current]
    els.qText.textContent = q.text

    els.options.innerHTML = ''
    q.options.forEach((opt) => {
      const btn = document.createElement('button')
      btn.className = 'btn btn-option'
      btn.textContent = opt.label
      btn.addEventListener('click', () => selectOption(q, opt))
      els.options.appendChild(btn)
    })

    updateProgress()
  }

  function selectOption(question, option) {
    answers[question.id] = option.value

    // 吸烟门：如果选了"吸烟"，插入追问
    if (question.id === config.smokeGate.questionId && option.value === config.smokeGate.triggerValue) {
      queue = insertAfter(queue, question.id, smokeGateQ2)
    }

    // 吸烟检测
    if (question.id === 'smoke_gate_q2' && option.value === config.smokeGate.smokerTriggerValue) {
      isSmoker = true
    }

    current++
    if (current >= totalCount()) {
      onComplete(answers, isSmoker)
    } else {
      renderQuestion()
    }
  }

  function start() {
    current = 0
    answers = {}
    isSmoker = false
    queue = insertAtRandom(shuffle(questions.main), smokeGateQ1)
    renderQuestion()
  }

  return { start, renderQuestion }
}
