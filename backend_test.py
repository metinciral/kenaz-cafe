import requests
import sys
import json
from datetime import datetime, timedelta

class KenazCafeAPITester:
    def __init__(self, base_url="https://coffee-hub-kenaz.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_result(self, test_name, passed, details=""):
        """Log test result"""
        self.tests_run += 1
        if passed:
            self.tests_passed += 1
            status = "✅ PASSED"
        else:
            status = "❌ FAILED"
        
        result = f"{status} - {test_name}: {details}"
        print(result)
        self.test_results.append({
            "test": test_name,
            "passed": passed,
            "details": details
        })
        return passed

    def run_api_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PATCH':
                response = requests.patch(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            details = f"Status: {response.status_code}"
            
            if success:
                try:
                    response_data = response.json()
                    if method == 'POST' and endpoint == 'reservations':
                        details += f", ID: {response_data.get('id', 'N/A')}"
                except:
                    pass
            else:
                try:
                    error_data = response.json()
                    details += f", Error: {error_data.get('detail', 'Unknown error')}"
                except:
                    details += f", Response: {response.text[:100]}"

            self.log_result(name, success, details)
            return success, response.json() if success and response.text else {}

        except requests.exceptions.Timeout:
            self.log_result(name, False, "Request timeout")
            return False, {}
        except requests.exceptions.ConnectionError:
            self.log_result(name, False, "Connection error - Backend may be down")
            return False, {}
        except Exception as e:
            self.log_result(name, False, f"Exception: {str(e)}")
            return False, {}

    def test_health_check(self):
        """Test API health endpoint"""
        return self.run_api_test("Health Check", "GET", "", 200)

    def test_create_reservation_valid(self):
        """Test creating a valid reservation"""
        tomorrow = (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d")
        
        reservation_data = {
            "name": "Ahmet Yılmaz",
            "email": "test@kenazcafe.com.tr",
            "phone": "05302488032",
            "date": tomorrow,
            "time": "14:30",
            "guests": 2,
            "message": "Pencere kenarı masa lütfen"
        }
        
        success, response = self.run_api_test(
            "Create Valid Reservation",
            "POST",
            "reservations",
            201,
            data=reservation_data
        )
        
        if success and response.get('id'):
            self.created_reservation_id = response['id']
            return True
        return False

    def test_create_reservation_invalid_email(self):
        """Test creating reservation with invalid email"""
        tomorrow = (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d")
        
        reservation_data = {
            "name": "Test User",
            "email": "invalid-email",  # Invalid email format
            "phone": "05302488032",
            "date": tomorrow,
            "time": "15:00",
            "guests": 3
        }
        
        return self.run_api_test(
            "Create Reservation - Invalid Email",
            "POST",
            "reservations",
            422,
            data=reservation_data
        )

    def test_create_reservation_invalid_phone(self):
        """Test creating reservation with invalid phone"""
        tomorrow = (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d")
        
        reservation_data = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "123",  # Too short phone
            "date": tomorrow,
            "time": "16:00",
            "guests": 1
        }
        
        return self.run_api_test(
            "Create Reservation - Invalid Phone",
            "POST",
            "reservations",
            400,
            data=reservation_data
        )

    def test_create_reservation_missing_fields(self):
        """Test creating reservation with missing required fields"""
        reservation_data = {
            "name": "Test User",
            # Missing email, phone, date, time, guests
        }
        
        return self.run_api_test(
            "Create Reservation - Missing Fields",
            "POST",
            "reservations",
            422,  # Validation error
            data=reservation_data
        )

    def test_get_all_reservations(self):
        """Test getting all reservations"""
        return self.run_api_test(
            "Get All Reservations",
            "GET",
            "reservations",
            200
        )

    def test_get_reservations_with_status_filter(self):
        """Test getting reservations with status filter"""
        return self.run_api_test(
            "Get Reservations - Status Filter (pending)",
            "GET",
            "reservations?status=pending",
            200
        )

    def test_get_specific_reservation(self):
        """Test getting a specific reservation by ID"""
        if hasattr(self, 'created_reservation_id'):
            return self.run_api_test(
                "Get Specific Reservation",
                "GET",
                f"reservations/{self.created_reservation_id}",
                200
            )
        else:
            self.log_result("Get Specific Reservation", False, "No reservation ID available")
            return False

    def test_get_nonexistent_reservation(self):
        """Test getting a non-existent reservation"""
        fake_id = "non-existent-id-12345"
        return self.run_api_test(
            "Get Non-existent Reservation",
            "GET",
            f"reservations/{fake_id}",
            404
        )

    def test_update_reservation_status_to_confirmed(self):
        """Test updating reservation status to confirmed"""
        if hasattr(self, 'created_reservation_id'):
            success, _ = self.run_api_test(
                "Update Status - Confirmed",
                "PATCH",
                f"reservations/{self.created_reservation_id}/status?status=confirmed",
                200
            )
            return success
        else:
            self.log_result("Update Status - Confirmed", False, "No reservation ID available")
            return False

    def test_update_reservation_status_to_cancelled(self):
        """Test updating reservation status to cancelled"""
        if hasattr(self, 'created_reservation_id'):
            success, _ = self.run_api_test(
                "Update Status - Cancelled",
                "PATCH",
                f"reservations/{self.created_reservation_id}/status?status=cancelled",
                200
            )
            return success
        else:
            self.log_result("Update Status - Cancelled", False, "No reservation ID available")
            return False

    def test_update_reservation_invalid_status(self):
        """Test updating reservation with invalid status"""
        if hasattr(self, 'created_reservation_id'):
            success, _ = self.run_api_test(
                "Update Status - Invalid",
                "PATCH",
                f"reservations/{self.created_reservation_id}/status?status=invalid_status",
                400
            )
            return success
        else:
            self.log_result("Update Status - Invalid", False, "No reservation ID available")
            return False

    def test_update_nonexistent_reservation_status(self):
        """Test updating status of non-existent reservation"""
        fake_id = "non-existent-id-12345"
        return self.run_api_test(
            "Update Non-existent Reservation Status",
            "PATCH",
            f"reservations/{fake_id}/status?status=confirmed",
            404
        )

    def run_all_tests(self):
        """Run all API tests in sequence"""
        print("🚀 Starting Kenaz Cafe API Tests")
        print("=" * 50)
        
        # Health check first
        health_ok = self.test_health_check()
        if not health_ok:
            print("❌ Backend API is not responding. Stopping tests.")
            return False
        
        # Test reservation creation (valid and invalid cases)
        self.test_create_reservation_valid()
        self.test_create_reservation_invalid_email()
        self.test_create_reservation_invalid_phone()
        self.test_create_reservation_missing_fields()
        
        # Test reservation retrieval
        self.test_get_all_reservations()
        self.test_get_reservations_with_status_filter()
        self.test_get_specific_reservation()
        self.test_get_nonexistent_reservation()
        
        # Test reservation status updates
        self.test_update_reservation_status_to_confirmed()
        self.test_update_reservation_status_to_cancelled()
        self.test_update_reservation_invalid_status()
        self.test_update_nonexistent_reservation_status()

        # Print final results
        print("\n" + "=" * 50)
        print(f"📊 Final Results: {self.tests_passed}/{self.tests_run} tests passed")
        
        success_rate = (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0
        print(f"📈 Success Rate: {success_rate:.1f}%")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return True
        else:
            print("⚠️  Some tests failed. Check the logs above.")
            return False

def main():
    tester = KenazCafeAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())