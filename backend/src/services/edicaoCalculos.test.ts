import { test } from 'node:test'
import assert from 'node:assert/strict'
import { diferenciarEdicao } from './edicaoCalculos.js'

test('registra apenas campos realmente alterados', () => {
  const atual = { titulo: 'A', descricao: 'x', prioridade: 'media', responsavelId: 'u1', prazoEstimado: new Date('2026-01-01') }
  const { data, logs } = diferenciarEdicao(atual, { titulo: 'B', prioridade: 'alta' })
  assert.equal(data.titulo, 'B')
  assert.equal(data.prioridade, 'alta')
  assert.equal(logs.length, 2)
  assert.deepEqual(logs[0], { campo: 'titulo', valorAnterior: 'A', valorNovo: 'B' })
})

test('não gera log quando nada muda', () => {
  const atual = { titulo: 'A', prioridade: 'media' }
  const { data, logs } = diferenciarEdicao(atual, { titulo: 'A', prioridade: 'media' })
  assert.equal(Object.keys(data).length, 0)
  assert.equal(logs.length, 0)
})

test('prazo: registra limpeza como antes→vazio', () => {
  const atual = { prazoEstimado: new Date('2026-01-01T00:00:00.000Z') }
  const { data, logs } = diferenciarEdicao(atual, { prazoEstimado: null })
  assert.equal(data.prazoEstimado, null)
  assert.equal(logs.length, 1)
  assert.equal(logs[0].campo, 'prazoEstimado')
  assert.equal(logs[0].valorNovo, null)
  assert.ok(logs[0].valorAnterior?.startsWith('2026-01-01'))
})

test('prazo: registra novo valor', () => {
  const atual = { prazoEstimado: null }
  const { data, logs } = diferenciarEdicao(atual, { prazoEstimado: '2026-02-02T00:00:00.000Z' })
  assert.ok(data.prazoEstimado instanceof Date)
  assert.equal(logs[0].valorAnterior, null)
  assert.ok(logs[0].valorNovo?.startsWith('2026-02-02'))
})
