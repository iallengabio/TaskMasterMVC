import { FirebaseAuthService } from '../../src/model/services/firebaseAuthService';
import { User } from '../../src/model/entities/user';
import { 
  User as FirebaseUser,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  UserCredential,
  getAuth
} from 'firebase/auth';

jest.mock('firebase/auth');

describe('FirebaseAuthService', () => {
  let firebaseAuthService: FirebaseAuthService;
  const auth = getAuth();

  beforeEach(() => {
    firebaseAuthService = new FirebaseAuthService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create a new user with email and password', async () => {
    const mockUserCredential = {
      user: {
        uid: '123',
        email: 'test@example.com',
        displayName: 'Test User',
        photoURL: 'http://example.com/photo.png'
      }
    } as UserCredential;

    (firebaseCreateUserWithEmailAndPassword as jest.Mock).mockResolvedValue(mockUserCredential);

    const user = await firebaseAuthService.createUserWithEmailAndPassword('test@example.com', 'password123');

    expect(user).toEqual(new User('123', 'test@example.com', 'Test User', 'http://example.com/photo.png'));
    expect(firebaseCreateUserWithEmailAndPassword).toHaveBeenCalledWith(auth, 'test@example.com', 'password123');
  });

  test('should sign in a user with email and password', async () => {
    const mockUserCredential = {
      user: {
        uid: '123',
        email: 'test@example.com',
        displayName: 'Test User',
        photoURL: 'http://example.com/photo.png'
      }
    } as UserCredential;

    (firebaseSignInWithEmailAndPassword as jest.Mock).mockResolvedValue(mockUserCredential);

    const user = await firebaseAuthService.signInWithEmailAndPassword('test@example.com', 'password123');

    expect(user).toEqual(new User('123', 'test@example.com', 'Test User', 'http://example.com/photo.png'));
    expect(firebaseSignInWithEmailAndPassword).toHaveBeenCalledWith(auth, 'test@example.com', 'password123');
  });

  test('should sign in a user with Google', async () => {
    const mockUserCredential = {
      user: {
        uid: '123',
        email: 'test@example.com',
        displayName: 'Test User',
        photoURL: 'http://example.com/photo.png'
      }
    } as UserCredential;

    (signInWithPopup as jest.Mock).mockResolvedValue(mockUserCredential);

    const user = await firebaseAuthService.signInWithGoogle();

    expect(user).toEqual(new User('123', 'test@example.com', 'Test User', 'http://example.com/photo.png'));
    expect(signInWithPopup).toHaveBeenCalledWith(auth, expect.any(GoogleAuthProvider));
  });

  test('should sign out the user', async () => {
    await firebaseAuthService.signOut();

    expect(firebaseSignOut).toHaveBeenCalledWith(auth);
  });

  test('should return the current user if authenticated', async () => {
    const mockFirebaseUser = {
      uid: '123',
      email: 'test@example.com',
      displayName: 'Test User',
      photoURL: 'http://example.com/photo.png'
    } as FirebaseUser;

    // Mock the currentUser getter to return the mockFirebaseUser
    (auth as any).currentUser = mockFirebaseUser;

    const user = await firebaseAuthService.getCurrentUser();

    expect(user).toEqual(new User('123', 'test@example.com', 'Test User', 'http://example.com/photo.png'));
  });

  test('should return null if no current user is authenticated', async () => {
    // Mock the currentUser getter to return null
    (auth as any).currentUser = null;

    const user = await firebaseAuthService.getCurrentUser();

    expect(user).toBeNull();
  });

  test('should observe auth state changes', () => {
    const callback = jest.fn();
    const unsubscribe = jest.fn();

    (firebaseOnAuthStateChanged as jest.Mock).mockImplementation((_auth, cb) => {
      cb({
        uid: '123',
        email: 'test@example.com',
        displayName: 'Test User',
        photoURL: 'http://example.com/photo.png'
      });
      return unsubscribe;
    });

    const unsubscribeFn = firebaseAuthService.onAuthStateChanged(callback);

    expect(callback).toHaveBeenCalledWith(new User('123', 'test@example.com', 'Test User', 'http://example.com/photo.png'));
    expect(unsubscribeFn).toBe(unsubscribe);
  });
});
