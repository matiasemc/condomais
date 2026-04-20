export interface Delivery {
  id: string;
  morador: string;
  apto: string;
  torre: string;
  remetente: string;
  tipo: string;
  status: 'pendente' | 'retirada';
  criadaEm: Date;
}

export interface Reservation {
  id: string;
  espaco: string;
  data: Date;
  horaInicio: string;
  horaFim: string;
  status: 'confirmada' | 'pendente' | 'cancelada';
}

export interface Announcement {
  id: string;
  titulo: string;
  mensagem: string;
  prioridade: 'alta' | 'media' | 'baixa';
  publicadoEm: Date;
  fixado: boolean;
}

export interface MarketplaceItem {
  id: string;
  titulo: string;
  preco: number;
  categoria: string;
  descricao: string;
  vendedor: string;
  whatsapp: string;
  criadoEm: Date;
}

export interface Notification {
  id: string;
  titulo: string;
  mensagem: string;
  lido: boolean;
  criadaEm: Date;
  tipo: 'entrega' | 'reserva' | 'aviso' | 'sistema';
}
