
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'
import Input from '../src/pages/Input'

describe('Input', () => {
  it('actualiza el valor al escribir en el input', () => {
    // Renderiza el componente
    render(<Input label="Nombre" />)

    // Busca el input por su placeholder
    const input = screen.getByPlaceholderText('Escribe algo')

    // Simula que se escribe "Estela"
    fireEvent.change(input, { target: { value: 'Estela' } })

    expect(screen.getByTestId('valor-mostrado')).toHaveTextContent('Valor actual: Estela')
  })
})
