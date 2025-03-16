import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../server/config/firebaseConfig";
import {
  createUserInFirestore,
  getUserFromFirestore,
  updateUserInFirestore,
} from "../server/services/user/userService";
import { User } from "../server/models/userTypes";

// Mockear funciones de Firebase Firestore
jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  setDoc: jest.fn(),
  getDoc: jest.fn(),
  updateDoc: jest.fn(),
}));

jest.mock("../server/config/firebaseConfig", () => ({
  firebaseConfig: {
    apiKey: "test-api-key",
    authDomain: "test-auth-domain",
    projectId: "test-project-id",
    storageBucket: "test-storage-bucket",
    messagingSenderId: "test-messaging-sender-id",
    appId: "test-app-id",
  },
}));

const mockUserData: User = {
  uid: "mock-uid",
  name: "Test User",
  email: "test@example.com",
  emailVerified: true,
  role: "standard_user",
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("User Services", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createUserInFirestore", () => {
    it("should create a new user in Firestore", async () => {
      const mockUserRef = { id: "mock-uid" };
      (doc as jest.Mock).mockReturnValue(mockUserRef);
      (setDoc as jest.Mock).mockResolvedValue(undefined);

      await createUserInFirestore(mockUserData);

      expect(doc).toHaveBeenCalledWith(firestore, "users", mockUserData.uid);
      expect(setDoc).toHaveBeenCalledWith(mockUserRef, {
        uid: mockUserData.uid,
        name: mockUserData.name,
        email: mockUserData.email,
        emailVerified: mockUserData.emailVerified,
        role: mockUserData.role,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it("should throw an error if creating the user fails", async () => {
      const mockError = {
        code: "firestore/permission-denied",
        message: "Permission denied",
      };
      (doc as jest.Mock).mockReturnValue({ id: "mock-uid" });
      (setDoc as jest.Mock).mockRejectedValue(mockError);

      await expect(createUserInFirestore(mockUserData)).rejects.toThrow(
        "Permission denied"
      );

      expect(doc).toHaveBeenCalledWith(firestore, "users", mockUserData.uid);
      expect(setDoc).toHaveBeenCalledWith(
        { id: "mock-uid" },
        {
          uid: mockUserData.uid,
          name: mockUserData.name,
          email: mockUserData.email,
          emailVerified: mockUserData.emailVerified,
          role: mockUserData.role,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }
      );
    });
  });

  describe("getUserFromFirestore", () => {
    it("should return user data if the user exists", async () => {
      const mockUserRef = { id: "mock-uid" };
      (doc as jest.Mock).mockReturnValue(mockUserRef);
      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => true,
        data: () => ({
          uid: mockUserData.uid,
          name: mockUserData.name,
          email: mockUserData.email,
          emailVerified: mockUserData.emailVerified,
          role: mockUserData.role,
          createdAt: mockUserData.createdAt,
          updatedAt: mockUserData.updatedAt,
        }),
      });

      const result = await getUserFromFirestore(mockUserData.uid);

      expect(doc).toHaveBeenCalledWith(firestore, "users", mockUserData.uid);
      expect(getDoc).toHaveBeenCalledWith(mockUserRef);
      expect(result).toEqual(mockUserData);
    });

    it("should return null if the user does not exist", async () => {
      const mockUserRef = { id: "mock-uid" };
      (doc as jest.Mock).mockReturnValue(mockUserRef);
      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => false,
      });

      const result = await getUserFromFirestore(mockUserData.uid);

      expect(doc).toHaveBeenCalledWith(firestore, "users", mockUserData.uid);
      expect(getDoc).toHaveBeenCalledWith(mockUserRef);
      expect(result).toBeNull();
    });

    it("should throw an error if fetching the user fails", async () => {
      const mockError = {
        code: "firestore/not-found",
        message: "User not found",
      };
      (doc as jest.Mock).mockReturnValue({ id: "mock-uid" });
      (getDoc as jest.Mock).mockRejectedValue(mockError);

      await expect(getUserFromFirestore(mockUserData.uid)).rejects.toThrow(
        "User not found"
      );

      expect(doc).toHaveBeenCalledWith(firestore, "users", mockUserData.uid);
      expect(getDoc).toHaveBeenCalledWith({ id: "mock-uid" });
    });
  });

  describe("updateUserInFirestore", () => {
    it("should update user data in Firestore", async () => {
      const mockUserRef = { id: "mock-uid" };
      (doc as jest.Mock).mockReturnValue(mockUserRef);
      (updateDoc as jest.Mock).mockResolvedValue(undefined);

      const updates = { name: "Updated Name", email: "updated@example.com" };

      await updateUserInFirestore(mockUserData.uid, updates);

      expect(doc).toHaveBeenCalledWith(firestore, "users", mockUserData.uid);
      expect(updateDoc).toHaveBeenCalledWith(mockUserRef, {
        ...updates,
        updatedAt: expect.any(Date),
      });
    });

    it("should throw an error if updating the user fails", async () => {
      const mockError = {
        code: "firestore/permission-denied",
        message: "Permission denied",
      };
      (doc as jest.Mock).mockReturnValue({ id: "mock-uid" });
      (updateDoc as jest.Mock).mockRejectedValue(mockError);

      const updates = { name: "Updated Name", email: "updated@example.com" };

      await expect(
        updateUserInFirestore(mockUserData.uid, updates)
      ).rejects.toThrow("Permission denied");

      expect(doc).toHaveBeenCalledWith(firestore, "users", mockUserData.uid);
      expect(updateDoc).toHaveBeenCalledWith(
        { id: "mock-uid" },
        {
          ...updates,
          updatedAt: expect.any(Date),
        }
      );
    });
  });
});
