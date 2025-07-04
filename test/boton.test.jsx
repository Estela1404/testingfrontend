import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Boton from '../src/pages/Boton';

describe('Boton', () => {
  it('muestra el texto enviado por props', () => {
    render(<Boton texto="Enviar" />);
    expect(screen.getByText('Enviar')).toBeInTheDocument();
  });
});
