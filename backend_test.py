#!/usr/bin/env python3
"""
Backend API Test Suite for Leopold Mols Portfolio
Tests all backend API endpoints according to requirements
"""

import requests
import sys
import json
from datetime import datetime

class PortfolioAPITester:
    def __init__(self, base_url):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, validate_response=None):
        """Run a single API test"""
        url = f"{self.base_url}/api/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            else:
                raise ValueError(f"Unsupported method: {method}")

            success = response.status_code == expected_status
            
            # Additional validation if provided
            if success and validate_response:
                try:
                    response_data = response.json() if response.content else {}
                    success = validate_response(response_data)
                except Exception as e:
                    print(f"❌ Response validation failed: {str(e)}")
                    success = False

            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_json = response.json() if response.content else {}
                    self.test_results.append({
                        "test": name,
                        "status": "PASS",
                        "response_code": response.status_code,
                        "response_data": response_json
                    })
                except:
                    self.test_results.append({
                        "test": name,
                        "status": "PASS",
                        "response_code": response.status_code,
                        "response_data": "Non-JSON response"
                    })
                return True, response_json if response.content else {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_content = response.json() if response.content else {"error": "Empty response"}
                except:
                    error_content = {"error": response.text}
                
                self.test_results.append({
                    "test": name,
                    "status": "FAIL",
                    "expected_code": expected_status,
                    "actual_code": response.status_code,
                    "error": error_content
                })
                return False, error_content

        except requests.exceptions.RequestException as e:
            print(f"❌ Failed - Network Error: {str(e)}")
            self.test_results.append({
                "test": name,
                "status": "FAIL",
                "error": f"Network Error: {str(e)}"
            })
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.test_results.append({
                "test": name,
                "status": "FAIL", 
                "error": f"Error: {str(e)}"
            })
            return False, {}

    def test_health_endpoint(self):
        """Test GET /api/health returns 200"""
        return self.run_test(
            "Health Check",
            "GET", 
            "health",
            200,
            validate_response=lambda r: "status" in r and r["status"] == "ok"
        )

    def test_get_all_projects(self):
        """Test GET /api/projects returns 8 projects as JSON array"""
        success, response = self.run_test(
            "Get All Projects",
            "GET",
            "projects", 
            200,
            validate_response=lambda r: isinstance(r, list) and len(r) == 8
        )
        return success, response

    def test_get_specific_project(self):
        """Test GET /api/projects/cloud-orchestrator returns project details"""
        return self.run_test(
            "Get Specific Project (cloud-orchestrator)",
            "GET",
            "projects/cloud-orchestrator",
            200,
            validate_response=lambda r: r.get("id") == "cloud-orchestrator" and "title" in r
        )

    def test_get_nonexistent_project(self):
        """Test GET /api/projects/nonexistent returns 404"""
        return self.run_test(
            "Get Non-existent Project", 
            "GET",
            "projects/nonexistent",
            404
        )

    def test_valid_contact_submission(self):
        """Test POST /api/contact with valid data saves to MongoDB and returns success"""
        valid_data = {
            "name": "Test User",
            "email": "test@example.com",
            "company": "Test Company",
            "budget": "10k-50k",
            "project_type": "Developpement web",
            "message": "This is a test message from automated testing suite. Please ignore this message as it is generated for API testing purposes."
        }
        
        success, response = self.run_test(
            "Valid Contact Form Submission",
            "POST", 
            "contact",
            200,
            data=valid_data,
            validate_response=lambda r: r.get("success") == True and "message" in r
        )
        return success, response

    def test_invalid_email_contact(self):
        """Test POST /api/contact with invalid email returns 422 validation error"""
        invalid_data = {
            "name": "Test User",
            "email": "invalid-email-format",
            "project_type": "Developpement web", 
            "message": "This is a test message with invalid email format"
        }
        
        return self.run_test(
            "Invalid Email Contact Submission",
            "POST",
            "contact",
            422,
            data=invalid_data
        )

    def test_honeypot_contact(self):
        """Test POST /api/contact with honeypot field filled should return success silently"""
        honeypot_data = {
            "name": "Bot User",
            "email": "bot@example.com", 
            "project_type": "Spam",
            "message": "This is a spam message",
            "website": "http://spam-site.com"  # Honeypot field
        }
        
        return self.run_test(
            "Honeypot Contact Submission",
            "POST",
            "contact", 
            200,
            data=honeypot_data,
            validate_response=lambda r: r.get("success") == True
        )

def main():
    base_url = "https://ca0b3b1e-8872-4f05-a588-981114536efb.preview.emergentagent.com"
    print(f"🚀 Starting Leopold Mols Portfolio API Tests")
    print(f"📡 Base URL: {base_url}")
    print("=" * 60)
    
    tester = PortfolioAPITester(base_url)
    
    # Run all backend API tests
    tester.test_health_endpoint()
    projects_success, projects_data = tester.test_get_all_projects()
    tester.test_get_specific_project()
    tester.test_get_nonexistent_project()
    tester.test_valid_contact_submission()
    tester.test_invalid_email_contact() 
    tester.test_honeypot_contact()
    
    # Print final results
    print("\n" + "=" * 60)
    print(f"📊 BACKEND API TEST RESULTS")
    print(f"Tests passed: {tester.tests_passed}/{tester.tests_run}")
    success_rate = (tester.tests_passed / tester.tests_run * 100) if tester.tests_run > 0 else 0
    print(f"Success rate: {success_rate:.1f}%")
    
    if projects_success and projects_data:
        print(f"\n📋 Projects found: {len(projects_data)}")
        for project in projects_data:
            print(f"  - {project.get('id', 'unknown')}: {project.get('title', 'No title')}")
    
    # Save detailed results to JSON for debugging
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump({
            "timestamp": datetime.now().isoformat(),
            "base_url": base_url,
            "summary": {
                "tests_run": tester.tests_run,
                "tests_passed": tester.tests_passed,
                "success_rate": success_rate
            },
            "test_results": tester.test_results
        }, f, indent=2)
    
    print(f"\n💾 Detailed results saved to /app/backend_test_results.json")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())