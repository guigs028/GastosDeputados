export const DeputadoCardSkeleton = () => {
  return (
    <div className="deputado-card skeleton-container">
      {/* Círculo para a foto */}
      <div className="skeleton skeleton-avatar"></div>
      
      {/* Linha para o nome */}
      <div className="skeleton skeleton-text skeleton-title"></div>
      
      {/* Linha para partido/UF */}
      <div className="skeleton skeleton-text skeleton-subtitle"></div>
      
      {/* Retângulo para o botão */}
      <div className="skeleton skeleton-button"></div>
    </div>
  );
};

// Componente para simular loading de um card de despesa
export const DespesaCardSkeleton = () => {
  return (
    <div className="despesa-card skeleton-container">
      <div className="skeleton skeleton-text skeleton-title"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text skeleton-small"></div>
    </div>
  );
};

// Componente para simular loading do header do deputado
export const DeputadoHeaderSkeleton = () => {
  return (
    <div className="deputado-header skeleton-container">
      <div className="skeleton skeleton-avatar-large"></div>
      <div>
        <div className="skeleton skeleton-text skeleton-title-large"></div>
        <div className="skeleton skeleton-text skeleton-subtitle"></div>
        <div className="skeleton skeleton-text skeleton-subtitle"></div>
      </div>
    </div>
  );
};