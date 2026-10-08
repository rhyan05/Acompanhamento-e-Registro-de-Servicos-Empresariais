import { test } from 'node:test'
import assert from 'node:assert/strict'
import { operacaoPermitida } from './escopoCalculos.js'

test('gestor tem acesso a qualquer operação', () => {
  assert.equal(operacaoPermitida('gestor', [], 'op-qualquer'), true)
})

test('operacional acessa apenas operações onde é membro', () => {
  const ids = ['op-1', 'op-2']
  assert.equal(operacaoPermitida('operacional', ids, 'op-1'), true)
  assert.equal(operacaoPermitida('operacional', ids, 'op-3'), false)
})

test('operacional sem vínculos não acessa nada', () => {
  assert.equal(operacaoPermitida('operacional', [], 'op-1'), false)
})
