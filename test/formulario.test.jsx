import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

// ⛔️ Aquí te está faltando esta línea:
import Formulario from '../src/pages/Formulario'; // ✅ ESTA ES LA CLAVE

describe('Formulario', () => {
  it('envía el valor del input al hacer submit y lo limpia', () => {
    const mockSubmit = vi.fn();

    render(<Formulario onSubmit={mockSubmit} />);

    const input = screen.getByTestId('campo');
    const boton = screen.getByRole('button', { name: /enviar/i });

    fireEvent.change(input, { target: { value: 'Hola' } });
    fireEvent.click(boton);

    expect(mockSubmit).toHaveBeenCalledWith('Hola');
    expect(input.value).toBe('');
  });
});
