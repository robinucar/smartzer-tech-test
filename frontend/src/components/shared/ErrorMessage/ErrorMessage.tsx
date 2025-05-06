export const ErrorMessage = ({ message }: { message: string }) => (
  <p
    role="alert"
    style={{ color: 'red', textAlign: 'center', padding: '1rem' }}
  >
    {message}
  </p>
);
