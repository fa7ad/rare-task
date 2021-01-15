function Rating({ count, children, fillColor = '#2aa799', blankColor = '#666' }) {
  const clamped = Math.min(Math.max(0, count), 5) | 0;
  const colored = Array.from({ length: clamped }, (_, i) => (
    <span key={`starc_${i}`} style={{ color: fillColor }}>
      ★
    </span>
  ));
  const blanks = Array.from({ length: 5 - clamped }, (_, i) => (
    <span key={`starb_${i}`} style={{ color: blankColor }}>
      ★
    </span>
  ));

  return (
    <div className='d-flex'>
      {colored}
      {blanks}
      {children && <span>{children}</span>}
    </div>
  );
}

export default Rating;
