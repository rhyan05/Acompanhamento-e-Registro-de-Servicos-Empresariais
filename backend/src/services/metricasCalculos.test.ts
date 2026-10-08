import { test } from 'node:test'
import assert from 'node:assert/strict'
import { calcularAderenciaPrazos, calcularTma } from './metricasCalculos.js'

const base = new Date('2026-01-01T00:00:00Z')
const dias = (n: number) => new Date(base.getTime() + n * 24 * 60 * 60 * 1000)

test('aderência a prazos: conta entregas dentro do prazo', () => {
  const atividades = [
    { prazoEstimado: dias(5), dataConclusao: dias(3), dataInicio: null },
    { prazoEstimado: dias(5), dataConclusao: dias(7), dataInicio: null },
  ]
  assert.equal(calcularAderenciaPrazos(atividades as any), 50)
})

test('aderência a prazos: sem dados não retorna 100', () => {
  assert.equal(calcularAderenciaPrazos([]), 0)
  assert.equal(calcularAderenciaPrazos([{ prazoEstimado: null, dataConclusao: null, dataInicio: null }] as any), 0)
})

test('TMA: média de dias entre início e conclusão', () => {
  const atividades = [
    { prazoEstimado: null, dataInicio: dias(0), dataConclusao: dias(2) },
    { prazoEstimado: null, dataInicio: dias(0), dataConclusao: dias(4) },
  ]
  assert.equal(calcularTma(atividades as any), 3)
})

test('TMA: ignora atividades sem início e zera sem dados', () => {
  assert.equal(calcularTma([{ prazoEstimado: null, dataInicio: null, dataConclusao: dias(1) }] as any), 0)
  assert.equal(calcularTma([]), 0)
})
